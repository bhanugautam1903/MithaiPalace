import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { useShop } from '@/contexts/ShopContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, cartTotal, placeOrder, user } = useShop();
  
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    if (!customerName.trim() || !customerEmail.trim()) {
      return;
    }

    setIsPlacingOrder(true);
    const success = placeOrder(customerName, customerEmail);
    setIsPlacingOrder(false);

    if (success) {
      navigate('/orders');
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <span className="text-8xl mb-6 block">🛒</span>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any sweets yet. Let's fix that!
          </p>
          <Button variant="hero" onClick={() => navigate('/shop')}>
            Start Shopping
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-foreground mb-8">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div 
                key={`${item.productId}-${item.weight}`}
                className="card-sweet p-4 flex items-center gap-4"
              >
                {/* Product Image/Emoji */}
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">🍬</span>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold text-foreground truncate">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.weight}
                  </p>
                  <p className="text-primary font-semibold">
                    ₹{item.price} each
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateCartQuantity(item.productId, item.weight, item.quantity - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateCartQuantity(item.productId, item.weight, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive/80"
                  onClick={() => removeFromCart(item.productId, item.weight)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-sweet p-6 sticky top-24">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Order Summary
              </h2>

              {/* Customer Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 border-t border-border pt-6 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="text-pistachio">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-border pt-3">
                  <span>Total</span>
                  <span className="text-primary">₹{cartTotal}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                variant="hero"
                className="w-full"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || !customerName.trim() || !customerEmail.trim()}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing an order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
