import { useNavigate } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { useShop } from '@/contexts/ShopContext';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function Orders() {
  const navigate = useNavigate();
  const { orders, user } = useShop();

  // Filter orders for current user (or show all for admin)
  const userOrders = user?.role === 'admin' 
    ? orders 
    : orders.filter(o => o.userId === user?.id || o.customerEmail === user?.email);

  if (userOrders.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <span className="text-8xl mb-6 block">📦</span>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            No Orders Yet
          </h1>
          <p className="text-muted-foreground mb-8">
            You haven't placed any orders yet. Start shopping!
          </p>
          <Button variant="hero" onClick={() => navigate('/shop')}>
            Browse Sweets
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
          My Orders
        </h1>

        <div className="space-y-6">
          {userOrders.map((order) => (
            <div key={order.id} className="card-sweet p-6">
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-primary" />
                    <span className="font-mono text-sm text-muted-foreground">
                      {order.id}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <Badge className={statusColors[order.status]}>
                  {statusLabels[order.status]}
                </Badge>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🍬</span>
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.weight} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="text-muted-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">₹{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
