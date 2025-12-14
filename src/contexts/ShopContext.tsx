import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Branding, Category, Product, CartItem, Order } from '../types';
import { 
  initialBranding, 
  initialCategories, 
  initialProducts, 
  initialOrders,
  ADMIN_CREDENTIALS 
} from '../data/initialData';
import { toast } from 'sonner';
import { api } from '../lib/api';

interface ShopContextType {
  // Auth
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  
  logout: () => void;
  isAdmin: boolean;

  // Branding
  branding: Branding;
  updateBranding: (branding: Branding) => void;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateCartQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Orders
  orders: Order[];
  placeOrder: (customerName: string, customerEmail: string) => boolean;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  // Load from localStorage or use initial data
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sweetshop_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [branding, setBranding] = useState<Branding>(() => {
    const saved = localStorage.getItem('sweetshop_branding');
    return saved ? JSON.parse(saved) : initialBranding;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('sweetshop_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sweetshop_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sweetshop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sweetshop_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [registeredUsers, setRegisteredUsers] = useState<{email: string; password: string; name: string}[]>(() => {
    const saved = localStorage.getItem('sweetshop_registered_users');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('sweetshop_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sweetshop_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sweetshop_branding', JSON.stringify(branding));
  }, [branding]);

  useEffect(() => {
    localStorage.setItem('sweetshop_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('sweetshop_products', JSON.stringify(products));
  }, [products]);

  // Try to load products from backend on mount (non-blocking)
  useEffect(() => {
    (async () => {
      try {
        const rows = await api.get('/api/sweets');
        if (Array.isArray(rows) && rows.length) {
          // map backend sweets to Product shape minimally
          const mapped = rows.map((s: any) => ({
            id: String(s.id),
            name: s.name,
            description: s.category || '',
            price: s.price,
            isEnabled: true,
            priceByWeight: [ { weight: '1', price: s.price, stock: s.quantity, id: `pw-${s.id}` } ]
          }));
          setProducts(mapped as any);
        }
      } catch (e) {
        // ignore if backend not available
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('sweetshop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sweetshop_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sweetshop_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const isAdmin = user?.role === 'admin';

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await api.post('/api/auth/login', { username: email, password });
      if (res && res.token) {
        const u: User = { id: res.user.id, email: res.user.email, name: res.user.username || res.user.name || '', role: res.user.role };
        setUser(u);
        localStorage.setItem('sweetshop_token', res.token);
        toast.success(`Welcome back, ${u.name || 'User'}!`);
        return true;
      }
    } catch (err) {
      // fall back to local auth
      const registeredUser = registeredUsers.find(u => u.email === email && u.password === password);
      if (registeredUser) {
        const customerUser: User = {
          id: `user-${Date.now()}`,
          email: registeredUser.email,
          name: registeredUser.name,
          role: 'customer'
        };
        setUser(customerUser);
        toast.success(`Welcome back, ${registeredUser.name}!`);
        return true;
      }
      toast.error('Invalid email or password');
      return false;
    }
    toast.error('Invalid email or password');
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const res = await api.post('/api/auth/register', { username: email, email, password });
      if (res && res.token) {
        const u: User = { id: res.user.id, email: res.user.email, name: res.user.username || name, role: res.user.role };
        setUser(u);
        localStorage.setItem('sweetshop_token', res.token);
        toast.success('Account created successfully!');
        return true;
      }
    } catch (err) {
      // fallback to local register
      if (email === ADMIN_CREDENTIALS.email) {
        toast.error('This email is reserved');
        return false;
      }

      if (registeredUsers.some(u => u.email === email)) {
        toast.error('Email already registered');
        return false;
      }

      setRegisteredUsers([...registeredUsers, { email, password, name }]);
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'customer'
      };
      setUser(newUser);
      toast.success('Account created successfully!');
      return true;
    }
    toast.error('Could not register');
    return false;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    toast.success('Logged out successfully');
  };

  // Branding
  const updateBranding = (newBranding: Branding) => {
    setBranding(newBranding);
    toast.success('Branding updated successfully');
  };

  // Categories
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`
    };
    setCategories([...categories, newCategory]);
    toast.success('Category added successfully');
  };

  const updateCategory = (id: string, categoryUpdate: Partial<Category>) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, ...categoryUpdate } : cat
    ));
    toast.success('Category updated successfully');
  };

  const deleteCategory = (id: string) => {
    // Check if category has products
    const hasProducts = products.some(p => p.categoryId === id);
    if (hasProducts) {
      toast.error('Cannot delete category with products');
      return;
    }
    setCategories(categories.filter(cat => cat.id !== id));
    toast.success('Category deleted successfully');
  };

  // Products
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`
    };
    setProducts([...products, newProduct]);
    toast.success('Product added successfully');
  };

  const updateProduct = (id: string, productUpdate: Partial<Product>) => {
    setProducts(products.map(prod => 
      prod.id === id ? { ...prod, ...productUpdate } : prod
    ));
    toast.success('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(prod => prod.id !== id));
    toast.success('Product deleted successfully');
  };

  const toggleProductStatus = (id: string) => {
    setProducts(products.map(prod => 
      prod.id === id ? { ...prod, isEnabled: !prod.isEnabled } : prod
    ));
    toast.success('Product status updated');
  };

  // Cart
  const addToCart = (item: CartItem) => {
    // Check stock
    const product = products.find(p => p.id === item.productId);
    const weightInfo = product?.priceByWeight.find(pw => pw.weight === item.weight);
    
    if (!weightInfo || weightInfo.stock < item.quantity) {
      toast.error('Insufficient stock');
      return;
    }

    const existingIndex = cart.findIndex(
      c => c.productId === item.productId && c.weight === item.weight
    );

    if (existingIndex >= 0) {
      const newQuantity = cart[existingIndex].quantity + item.quantity;
      if (newQuantity > weightInfo.stock) {
        toast.error('Insufficient stock');
        return;
      }
      const newCart = [...cart];
      newCart[existingIndex].quantity = newQuantity;
      setCart(newCart);
    } else {
      setCart([...cart, item]);
    }
    toast.success('Added to cart');
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCart(cart.filter(c => !(c.productId === productId && c.weight === weight)));
    toast.success('Removed from cart');
  };

  const updateCartQuantity = (productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }

    // Check stock
    const product = products.find(p => p.id === productId);
    const weightInfo = product?.priceByWeight.find(pw => pw.weight === weight);
    
    if (!weightInfo || weightInfo.stock < quantity) {
      toast.error('Insufficient stock');
      return;
    }

    setCart(cart.map(c => 
      c.productId === productId && c.weight === weight 
        ? { ...c, quantity } 
        : c
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Orders
  const placeOrder = (customerName: string, customerEmail: string): boolean => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return false;
    }

    // Check stock for all items
    for (const item of cart) {
      const product = products.find(p => p.id === item.productId);
      const weightInfo = product?.priceByWeight.find(pw => pw.weight === item.weight);
      
      if (!weightInfo || weightInfo.stock < item.quantity) {
        toast.error(`${item.productName} (${item.weight}) is out of stock`);
        return false;
      }
    }

    // Reduce inventory
    const updatedProducts = products.map(product => {
      const cartItems = cart.filter(c => c.productId === product.id);
      if (cartItems.length === 0) return product;

      return {
        ...product,
        priceByWeight: product.priceByWeight.map(pw => {
          const cartItem = cartItems.find(c => c.weight === pw.weight);
          if (!cartItem) return pw;
          return {
            ...pw,
            stock: pw.stock - cartItem.quantity
          };
        })
      };
    });
    setProducts(updatedProducts);

    // Create order
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: user?.id || 'guest',
      customerName,
      customerEmail,
      items: [...cart],
      total: cartTotal,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    toast.success('Order placed successfully!');
    return true;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
    toast.success('Order status updated');
  };

  return (
    <ShopContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAdmin,
      branding,
      updateBranding,
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleProductStatus,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      orders,
      placeOrder,
      updateOrderStatus
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
