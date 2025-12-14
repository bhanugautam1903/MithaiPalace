import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/contexts/ShopContext';

export default function Index() {
  const navigate = useNavigate();
  const { branding, categories, products } = useShop();

  // Get featured products (first 4 enabled products)
  const featuredProducts = products.filter(p => p.isEnabled).slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl animate-float">🍬</div>
          <div className="absolute top-40 right-20 text-6xl animate-float delay-200">🎂</div>
          <div className="absolute bottom-20 left-1/4 text-7xl animate-float delay-300">🍰</div>
          <div className="absolute bottom-40 right-1/3 text-5xl animate-float delay-100">🍭</div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 animate-fade-in">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                ✨ Premium Mithai Crafted with Love
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in delay-100">
              Welcome to <span className="hero-underline">Mithai Palace</span>
            </h1>

            <h2 className="text-xl md:text-2xl text-muted-foreground mb-4 font-serif italic animate-fade-in delay-150">
              Handcrafted Indian Sweets Made with Love & Legacy
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in delay-200">
              Authentic Indian sweets handcrafted using traditional recipes, premium ingredients, and generations of expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
              <Button 
                variant="hero" 
                onClick={() => navigate('/shop')}
                title="Explore our premium sweets"
              >
                Explore Our Sweets →
              </Button>
              <div title="Track orders & get exclusive offers">
                <Button 
                  variant="hero-outline"
                  onClick={() => navigate('/auth')}
                >
                  👤 Login to Your Sweet Account
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* large soft mithai visual for asymmetry */}
        <div className="hero-mithai">🍮</div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Why Us (new) */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 animate-fade-in">Why Customers Love Us</h2>
            <p className="text-muted-foreground">Small batch, big heart — what makes Mithai Palace special.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '❤️', title: 'Made with Love, Not Machines' },
              { icon: '🌿', title: 'No Preservatives' },
              { icon: '🕰️', title: 'Traditional Recipes' },
              { icon: '📦', title: 'Freshly Packed for You' }
            ].map((c, i) => (
              <div key={i} className="card-sweet ripple card-glow-hover p-6 text-center">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="font-display font-semibold">{c.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Reviews (new) */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold">Trusted by Sweet Lovers Across India</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-sweet p-6 text-center">
              <div className="text-xl font-semibold">⭐⭐⭐⭐⭐</div>
              <p className="mt-3 text-muted-foreground">“Best sweets I’ve tasted outside my hometown.”</p>
              <div className="mt-4 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-sm font-medium text-foreground">AS</div>
                <div className="mt-2 font-semibold">Amit Sharma</div>
                <div className="text-xs text-muted-foreground">Delhi</div>
              </div>
            </div>

            <div className="card-sweet p-6 text-center">
              <div className="text-xl font-semibold">⭐⭐⭐⭐⭐</div>
              <p className="mt-3 text-muted-foreground">“Authentic taste and premium quality. Feels like home.”</p>
              <div className="mt-4 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-sm font-medium text-foreground">NV</div>
                <div className="mt-2 font-semibold">Neha Verma</div>
                <div className="text-xs text-muted-foreground">Jaipur</div>
              </div>
            </div>

            <div className="card-sweet p-6 text-center">
              <div className="text-xl font-semibold">⭐⭐⭐⭐⭐</div>
              <p className="mt-3 text-muted-foreground">“Fast delivery and every bite was delightful.”</p>
              <div className="mt-4 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-sm font-medium text-foreground">RM</div>
                <div className="mt-2 font-semibold">Rahul Mehta</div>
                <div className="text-xs text-muted-foreground">Mumbai</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sweet of the Day (new) */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="card-sweet p-6 bg-gradient-to-r from-amber-50 to-amber-100 border border-border/40 shadow-medium flex items-center gap-6">
              <div className="text-6xl">🍬</div>
              <div>
                <div className="text-sm text-primary font-medium">🍬 Sweet of the Day</div>
                <h3 className="font-display text-2xl font-semibold mt-1">Kaju Katli — Freshly prepared today</h3>
                <div className="text-sm text-muted-foreground mt-2">⭐ Bestseller • Limited Stock</div>
              </div>
              <div className="ml-auto">
                <Button variant="hero" onClick={() => navigate('/shop')}>Order Today</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip (enhanced) */}
      <section className="py-4 bg-gradient-to-r from-primary/5 to-transparent border-t border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-muted-foreground">
            <div className="flex items-start gap-3 w-1/2 sm:w-auto">
              <span className="text-2xl mt-1">🌿</span>
              <div>
                <div className="font-medium">No Preservatives</div>
                <div className="text-xs text-muted-foreground">Only natural goodness</div>
              </div>
            </div>

            <div className="flex items-start gap-3 w-1/2 sm:w-auto">
              <span className="text-2xl mt-1">❤️</span>
              <div>
                <div className="font-medium">Made with Love, Not Machines</div>
                <div className="text-xs text-muted-foreground">Handcrafted daily</div>
              </div>
            </div>

            <div className="flex items-start gap-3 w-1/2 sm:w-auto">
              <span className="text-2xl mt-1">📦</span>
              <div>
                <div className="font-medium">Freshly Packed for You</div>
                <div className="text-xs text-muted-foreground">Carefully sealed to keep flavors intact</div>
              </div>
            </div>

            <div className="flex items-start gap-3 w-1/2 sm:w-auto">
              <span className="text-2xl mt-1">🕰️</span>
              <div>
                <div className="font-medium">Traditional Recipes</div>
                <div className="text-xs text-muted-foreground">Passed down through generations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Made with pure ghee, fresh milk, and finest dry fruits
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in delay-100">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">100% Authentic</h3>
              <p className="text-muted-foreground">
                Traditional recipes passed down through generations
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in delay-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Fresh Delivery</h3>
              <p className="text-muted-foreground">
                Freshly prepared and carefully packaged for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From daily classics to royal delights, explore our carefully curated categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Sweets
              </h2>
              <p className="text-muted-foreground">
                Our most loved selections
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/shop')}
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Taste the Tradition?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Order now and experience the authentic flavors of India, 
            delivered fresh to your doorstep.
          </p>
          <Button variant="hero" onClick={() => navigate('/shop')}>
            Order Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
