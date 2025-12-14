import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShop } from '@/contexts/ShopContext';
import { Product } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductCardProps {
  product: Product;
}

const categoryEmojis: Record<string, string> = {
  'cat-1': '🍬',
  'cat-2': '💎',
  'cat-3': '👑',
};

const categoryGradients: Record<string, string> = {
  'cat-1': 'from-amber-100 to-orange-100',
  'cat-2': 'from-rose-100 to-pink-100',
  'cat-3': 'from-yellow-100 to-amber-100',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, categories } = useShop();
  const [selectedWeight, setSelectedWeight] = useState(product.priceByWeight[0]?.weight || '');
  const [quantity, setQuantity] = useState(1);

  const selectedPriceInfo = product.priceByWeight.find(pw => pw.weight === selectedWeight);
  const category = categories.find(c => c.id === product.categoryId);
  const isOutOfStock = !selectedPriceInfo || selectedPriceInfo.stock === 0;

  const handleAddToCart = () => {
    if (!selectedPriceInfo || isOutOfStock) return;

    addToCart({
      productId: product.id,
      productName: product.name,
      weight: selectedWeight,
      price: selectedPriceInfo.price,
      quantity,
      image: product.image
    });
    setQuantity(1);
  };

  const bgGradient = categoryGradients[product.categoryId] || 'from-gray-100 to-gray-200';
  const hasImage = product.image && product.image.length > 0;

  return (
    <div className="card-sweet group">
      {/* Image/Emoji Section */}
      <div className={`relative h-48 ${!hasImage ? `bg-gradient-to-br ${bgGradient}` : ''} flex items-center justify-center overflow-hidden`}>
        {hasImage ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-7xl group-hover:scale-110 transition-transform duration-500 animate-float">
            {category?.icon || categoryEmojis[product.categoryId] || '🍰'}
          </span>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium px-2 py-1 rounded-full">
            {category?.name}
          </span>
        </div>

        {/* Stock Badge */}
        {isOutOfStock ? (
          <div className="absolute top-3 right-3">
            <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        ) : selectedPriceInfo && selectedPriceInfo.stock <= 5 && (
          <div className="absolute top-3 right-3">
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
              Only {selectedPriceInfo.stock} left
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Weight Selection */}
        <div className="mb-4">
          <Select value={selectedWeight} onValueChange={setSelectedWeight}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select weight" />
            </SelectTrigger>
            <SelectContent>
              {product.priceByWeight.map((pw) => (
                <SelectItem key={pw.weight} value={pw.weight}>
                  {pw.weight} - ₹{pw.price} {pw.stock === 0 && '(Out of stock)'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">
              ₹{selectedPriceInfo?.price || 0}
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              / {selectedWeight}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isOutOfStock}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(Math.min(selectedPriceInfo?.stock || 1, quantity + 1))}
              disabled={isOutOfStock}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="gold"
          className="w-full"
          onClick={handleAddToCart}
          disabled={isOutOfStock || !product.isEnabled}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}
