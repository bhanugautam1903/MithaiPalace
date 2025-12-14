export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Branding {
  appName: string;
  appLogo: string;
  appDescription: string;
  logoImage?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  weights: string[];
  image?: string;
}

export interface PriceByWeight {
  weight: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  image: string;
  priceByWeight: PriceByWeight[];
  isEnabled: boolean;
}

export interface CartItem {
  productId: string;
  productName: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}
