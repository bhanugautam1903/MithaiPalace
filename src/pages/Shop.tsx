import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/contexts/ShopContext';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, products } = useShop();
  
  const [search, setSearch] = useState('');
  const selectedCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Only show enabled products
      if (!product.isEnabled) return false;
      
      // Filter by category
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }
      
      // Filter by search
      if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [products, selectedCategory, search]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-secondary/50 to-background py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {currentCategory ? currentCategory.name : 'All Sweets'}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {currentCategory ? currentCategory.description : 'Explore our complete collection of handcrafted sweets'}
            </p>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for sweets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setSearch('')}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'gold' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange('all')}
              >
                <Filter className="w-4 h-4 mr-2" />
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'gold' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              No sweets found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" onClick={() => { setSearch(''); handleCategoryChange('all'); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-muted-foreground">
              Showing {filteredProducts.length} sweet{filteredProducts.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
