import { useState } from 'react';
import { Plus, Pencil, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useShop } from '@/contexts/ShopContext';
import ImageUpload from '@/components/ImageUpload';
import AdminLayout from './AdminLayout';
import { Category } from '@/types';

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useShop();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [weights, setWeights] = useState('');
  const [image, setImage] = useState('');

  const openDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setName(category.name);
      setIcon(category.icon);
      setDescription(category.description);
      setWeights(category.weights.join(', '));
      setImage(category.image || '');
    } else {
      setEditingCategory(null);
      setName('');
      setIcon('🍬');
      setDescription('');
      setWeights('100g, 250g, 500g');
      setImage('');
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const weightsArray = weights.split(',').map(w => w.trim()).filter(Boolean);
    
    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name,
        icon,
        description,
        weights: weightsArray,
        image
      });
    } else {
      addCategory({
        name,
        icon,
        description,
        weights: weightsArray,
        image
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleDelete = (categoryId: string) => {
    const productCount = products.filter(p => p.categoryId === categoryId).length;
    if (productCount > 0) {
      return; // Toast will be shown by context
    }
    deleteCategory(categoryId);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Categories</h1>
            <p className="text-muted-foreground">Manage your sweet categories</p>
          </div>
          <Button variant="gold" onClick={() => openDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const productCount = products.filter(p => p.categoryId === category.id).length;
            const hasImage = category.image && category.image.length > 0;
            
            return (
              <div key={category.id} className="card-sweet overflow-hidden">
                {/* Category Image */}
                {hasImage ? (
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
                    <span className="text-5xl">{category.icon}</span>
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="font-display text-lg font-semibold">{category.name}</h3>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openDialog(category)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(category.id)}
                        disabled={productCount > 0}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{productCount} products</span>
                    <span className="text-primary font-medium">
                      {category.weights.join(' | ')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Category Image */}
              <div className="space-y-2">
                <Label>Category Image</Label>
                <ImageUpload
                  value={image}
                  onChange={setImage}
                  placeholder="Upload category image"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Premium Collection"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon (Emoji)</Label>
                <Input
                  id="icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="🍬"
                  className="text-3xl h-14"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Premium • Festive • Gifting"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weights">Weight Options (comma separated)</Label>
                <Input
                  id="weights"
                  value={weights}
                  onChange={(e) => setWeights(e.target.value)}
                  placeholder="100g, 250g, 500g"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="gold" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  {editingCategory ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
