import { Package, Grid3X3, ShoppingCart, TrendingUp } from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';
import AdminLayout from './AdminLayout';

export default function AdminDashboard() {
  const { products, categories, orders } = useShop();

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: Grid3X3,
      color: 'bg-accent/10 text-accent',
    },
    {
      label: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      color: 'bg-pistachio/10 text-pistachio',
    },
    {
      label: 'Revenue',
      value: `₹${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-rose/10 text-rose',
    },
  ];

  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = products.filter(p => 
    p.priceByWeight.some(pw => pw.stock > 0 && pw.stock <= 10)
  ).slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="card-sweet p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="card-sweet p-6">
            <h2 className="font-display text-xl font-semibold mb-4">Recent Orders</h2>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">₹{order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Low Stock Alert */}
          <div className="card-sweet p-6">
            <h2 className="font-display text-xl font-semibold mb-4">Low Stock Alert</h2>
            {lowStockProducts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">All products are well stocked</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🍬</span>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.priceByWeight.filter(pw => pw.stock <= 10 && pw.stock > 0).map(pw => 
                            `${pw.weight}: ${pw.stock} left`
                          ).join(', ')}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                      Low Stock
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
