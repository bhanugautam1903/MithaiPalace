import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useShop } from '@/contexts/ShopContext';
import ImageUpload from '@/components/ImageUpload';
import AdminLayout from './AdminLayout';

export default function AdminBranding() {
  const { branding, updateBranding } = useShop();
  
  const [appName, setAppName] = useState(branding.appName);
  const [appLogo, setAppLogo] = useState(branding.appLogo);
  const [appDescription, setAppDescription] = useState(branding.appDescription);
  const [logoImage, setLogoImage] = useState(branding.logoImage || '');

  const handleSave = () => {
    updateBranding({
      appName,
      appLogo,
      appDescription,
      logoImage
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Branding</h1>
          <p className="text-muted-foreground">Customize your shop's appearance</p>
        </div>

        {/* Preview Card */}
        <div className="card-sweet p-8 mb-8 text-center">
          {logoImage ? (
            <img 
              src={logoImage} 
              alt="Shop Logo" 
              className="w-24 h-24 mx-auto mb-4 rounded-2xl object-cover shadow-medium"
            />
          ) : (
            <span className="text-6xl mb-4 block">{appLogo}</span>
          )}
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            {appName}
          </h2>
          <p className="text-muted-foreground">{appDescription}</p>
        </div>

        {/* Form */}
        <div className="card-sweet p-6 space-y-6">
          {/* Logo Image Upload */}
          <div className="space-y-2">
            <Label>Shop Logo Image</Label>
            <ImageUpload
              value={logoImage}
              onChange={setLogoImage}
              placeholder="Upload your shop logo"
            />
            <p className="text-xs text-muted-foreground">
              Upload a custom logo image. If not set, the emoji below will be used.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appName">Shop Name</Label>
            <Input
              id="appName"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="Enter shop name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="appLogo">Fallback Logo Emoji</Label>
            <Input
              id="appLogo"
              value={appLogo}
              onChange={(e) => setAppLogo(e.target.value)}
              placeholder="Enter an emoji"
              className="text-4xl h-16"
            />
            <p className="text-xs text-muted-foreground">
              This emoji is used when no logo image is uploaded (e.g., 🍬 🍰 🎂)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appDescription">Tagline / Description</Label>
            <Textarea
              id="appDescription"
              value={appDescription}
              onChange={(e) => setAppDescription(e.target.value)}
              placeholder="Enter your shop's tagline"
              rows={3}
            />
          </div>

          <Button variant="gold" onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
