import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useShop } from '@/contexts/ShopContext';
import ImageUpload from '@/components/ImageUpload';
import AdminLayout from './AdminLayout';
import { Product, PriceByWeight } from '@/types';

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct, toggleProductStatus } = useShop();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState('');
  const [priceByWeight, setPriceByWeight] = useState<PriceByWeight[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  const openDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setName(product.name);
      setDescription(product.description);
      setCategoryId(product.categoryId);
      setImage(product.image || '');
      setPriceByWeight([...product.priceByWeight]);
      setIsEnabled(product.isEnabled);
    } else {
      setEditingProduct(null);
      setName('');
      setDescription('');
      setCategoryId(categories[0]?.id || '');
      setImage('');
      // Initialize with category weights
      const category = categories[0];
      if (category) {
        setPriceByWeight(category.weights.map(w => ({ weight: w, price: 0, stock: 0 })));
      } else {
        setPriceByWeight([]);
      }
      setIsEnabled(true);
    }
    setIsDialogOpen(true);
  };

  const handleCategoryChange = (newCategoryId: string) => {
    setCategoryId(newCategoryId);
    const category = categories.find(c => c.id === newCategoryId);
    if (category) {
      setPriceByWeight(category.weights.map(w => {
        const existing = priceByWeight.find(pw => pw.weight === w);
        return existing || { weight: w, price: 0, stock: 0 };
      }));
    }
  };

  const updatePriceWeight = (index: number, field: keyof PriceByWeight, value: number) => {
    const updated = [...priceByWeight];
    updated[index] = { ...updated[index], [field]: value };
    setPriceByWeight(updated);
  };

  const handleSave = () => {
    const productData = {
      name,
      description,
      categoryId,
      image,
      priceByWeight,
      isEnabled
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    
    setIsDialogOpen(false);
  };

  const getCategory = (categoryId: string) => categories.find(c => c.id === categoryId);

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Manage your sweets inventory</p>
          </div>
          <Button variant="gold" onClick={() => openDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Products Table */}
        <div className="card-sweet overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Prices</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => {
                  const category = getCategory(product.categoryId);
                  const totalStock = product.priceByWeight.reduce((sum, pw) => sum + pw.stock, 0);
                  const hasImage = product.image && product.image.length > 0;
                  
                  return (
                    <tr key={product.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {hasImage ? (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <span className="text-3xl">{category?.icon || '🍬'}</span>
                          )}
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm">{category?.name}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm space-y-1">
                          {product.priceByWeight.map((pw) => (
                            <div key={pw.weight} className="text-muted-foreground">
                              {pw.weight}: ₹{pw.price}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-medium ${
                          totalStock === 0 ? 'text-destructive' :
                          totalStock <= 20 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {totalStock} units
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProductStatus(product.id)}
                          className={product.isEnabled ? 'text-green-600' : 'text-muted-foreground'}
                        >
                          {product.isEnabled ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </Button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openDialog(product)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Product Image */}
              <div className="space-y-2">
                <Label>Product Image</Label>
                <ImageUpload
                  value={image}
                  onChange={setImage}
                  placeholder="Upload sweet image"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Golden Ladoo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the sweet..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={categoryId} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price by Weight */}
              <div className="space-y-3">
                <Label>Price & Stock by Weight</Label>
                {priceByWeight.map((pw, index) => (
                  <div key={pw.weight} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    <span className="font-medium w-16">{pw.weight}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">₹</span>
                        <Input
                          type="number"
                          value={pw.price}
                          onChange={(e) => updatePriceWeight(index, 'price', Number(e.target.value))}
                          placeholder="Price"
                          className="h-9"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={pw.stock}
                          onChange={(e) => updatePriceWeight(index, 'stock', Number(e.target.value))}
                          placeholder="Stock"
                          className="h-9"
                        />
                        <span className="text-sm text-muted-foreground">units</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between py-2">
                <Label htmlFor="enabled">Product Enabled</Label>
                <Switch
                  id="enabled"
                  checked={isEnabled}
                  onCheckedChange={setIsEnabled}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="gold" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  {editingProduct ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
