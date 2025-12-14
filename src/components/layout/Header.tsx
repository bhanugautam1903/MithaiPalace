import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShop } from '@/contexts/ShopContext';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { branding, user, logout, isAdmin, cart } = useShop();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {branding.logoImage ? (
              <img 
                src={branding.logoImage} 
                alt={branding.appName}
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                {branding.appLogo}
              </span>
            )}
            <div>
              <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
                {branding.appName}
              </h1>
              <p className="text-xs text-muted-foreground hidden md:block">
                {branding.appDescription}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Shop
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-accent hover:text-accent/80 transition-colors font-medium flex items-center gap-1"
              >
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-3 py-2">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="gold" 
                size="sm"
                onClick={() => navigate('/auth')}
                className="hidden md:flex"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              <Link 
                to="/" 
                className="px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="px-4 py-2 text-accent hover:bg-secondary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              {user ? (
                <>
                  <div className="px-4 py-2 border-t border-border mt-2">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="px-4 py-2 text-left text-destructive hover:bg-secondary rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Button 
                  variant="gold" 
                  className="mx-4 mt-2"
                  onClick={() => { navigate('/auth'); setMobileMenuOpen(false); }}
                >
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
