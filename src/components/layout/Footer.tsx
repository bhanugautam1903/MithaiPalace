import { useShop } from '@/contexts/ShopContext';

export default function Footer() {
  const { branding } = useShop();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{branding.appLogo}</span>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {branding.appName}
              </h3>
            </div>
            <p className="text-muted-foreground">
              {branding.appDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/shop" className="hover:text-primary transition-colors">Shop</a></li>
              <li><a href="/cart" className="hover:text-primary transition-colors">Cart</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">
              Contact
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>📍 123 Sweet Street, Mithai Nagar</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ info@mithaipalace.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2024 {branding.appName}. All rights reserved.</p>
          <p className="text-sm mt-2">Made with ❤️ for sweet lovers</p>
        </div>
      </div>
    </footer>
  );
}
