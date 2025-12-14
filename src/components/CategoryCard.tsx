import { useNavigate } from 'react-router-dom';
import { Category } from '@/types';
import { useShop } from '@/contexts/ShopContext';

interface CategoryCardProps {
  category: Category;
}

const categoryBgs: Record<string, string> = {
  'cat-1': 'from-amber-50 to-orange-100 hover:from-amber-100 hover:to-orange-200',
  'cat-2': 'from-rose-50 to-pink-100 hover:from-rose-100 hover:to-pink-200',
  'cat-3': 'from-yellow-50 to-amber-100 hover:from-yellow-100 hover:to-amber-200',
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();
  const { products } = useShop();
  
  const productCount = products.filter(p => p.categoryId === category.id && p.isEnabled).length;
  const bgClass = categoryBgs[category.id] || 'from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200';

  return (
    <div
      onClick={() => navigate(`/shop?category=${category.id}`)}
      className={`card-sweet ripple card-glow-hover cursor-pointer p-6 bg-gradient-to-br ${bgClass} transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="text-5xl mb-4 animate-float">{category.icon}</div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        {category.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        {category.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-primary font-medium">
          {productCount} items
        </span>
        <span className="text-xs text-muted-foreground">
          {category.weights.join(' | ')}
        </span>
      </div>
    </div>
  );
}
