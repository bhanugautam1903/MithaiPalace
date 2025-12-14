import { Branding, Category, Product, Order, User } from '@/types';

export const initialBranding: Branding = {
  appName: "Mithai Palace",
  appLogo: "🍬",
  appDescription: "Authentic Indian Sweets - Handcrafted with Love & Tradition"
};

export const initialCategories: Category[] = [
  {
    id: "cat-1",
    name: "Sweet Street Classics",
    icon: "🍬",
    description: "Affordable • Daily Cravings • Mass Favorite",
    weights: ["100g", "250g", "500g"]
  },
  {
    id: "cat-2", 
    name: "Fusion Fiesta Delights",
    icon: "💎",
    description: "Modern • Youth-Friendly • Indo-Western",
    weights: ["150g", "500g", "1000g"]
  },
  {
    id: "cat-3",
    name: "Royal Reserve Collection",
    icon: "👑",
    description: "Luxury • Festive • Gifting Specials",
    weights: ["500g", "750g", "1000g"]
  }
];

export const initialProducts: Product[] = [
  // Sweet Street Classics
  {
    id: "prod-1",
    name: "Happy Ladoo Drops",
    description: "Classic golden ladoos made with pure ghee and besan",
    categoryId: "cat-1",
    image: "",
    priceByWeight: [
      { weight: "100g", price: 60, stock: 50 },
      { weight: "250g", price: 140, stock: 30 },
      { weight: "500g", price: 270, stock: 20 }
    ],
    isEnabled: true
  },
  {
    id: "prod-2",
    name: "Jolly Jalebi Twists",
    description: "Crispy, syrup-soaked jalebis with saffron touch",
    categoryId: "cat-1",
    image: "",
    priceByWeight: [
      { weight: "100g", price: 50, stock: 60 },
      { weight: "250g", price: 120, stock: 40 },
      { weight: "500g", price: 230, stock: 25 }
    ],
    isEnabled: true
  },
  {
    id: "prod-3",
    name: "Candy Cloud Cubes",
    description: "Soft and fluffy milk-based cubes with rose essence",
    categoryId: "cat-1",
    image: "",
    priceByWeight: [
      { weight: "100g", price: 55, stock: 45 },
      { weight: "250g", price: 130, stock: 35 },
      { weight: "500g", price: 250, stock: 20 }
    ],
    isEnabled: true
  },
  {
    id: "prod-4",
    name: "Sweet Street Squares",
    description: "Assorted traditional barfi squares",
    categoryId: "cat-1",
    image: "",
    priceByWeight: [
      { weight: "100g", price: 65, stock: 40 },
      { weight: "250g", price: 150, stock: 30 },
      { weight: "500g", price: 290, stock: 18 }
    ],
    isEnabled: true
  },
  {
    id: "prod-5",
    name: "Pista Pearl Pops",
    description: "Premium pistachio balls with cardamom",
    categoryId: "cat-1",
    image: "",
    priceByWeight: [
      { weight: "100g", price: 75, stock: 35 },
      { weight: "250g", price: 180, stock: 25 },
      { weight: "500g", price: 350, stock: 15 }
    ],
    isEnabled: true
  },
  {
    id: "prod-6",
    name: "Gulab Glow Balls",
    description: "Rose-flavored gulab jamun with silver vark",
    categoryId: "cat-1",
    image: "",
    priceByWeight: [
      { weight: "100g", price: 70, stock: 50 },
      { weight: "250g", price: 165, stock: 35 },
      { weight: "500g", price: 320, stock: 22 }
    ],
    isEnabled: true
  },
  {
    id: "prod-7",
    name: "Khoya Kiss Treats",
    description: "Rich khoya peda with saffron strands",
    categoryId: "cat-1",
    image: "",
    priceByWeight: [
      { weight: "100g", price: 80, stock: 40 },
      { weight: "250g", price: 190, stock: 28 },
      { weight: "500g", price: 370, stock: 16 }
    ],
    isEnabled: true
  },
  // Fusion Fiesta Delights
  {
    id: "prod-8",
    name: "Malai Moon Delight",
    description: "Creamy malai-based fusion dessert with modern twist",
    categoryId: "cat-2",
    image: "",
    priceByWeight: [
      { weight: "150g", price: 160, stock: 30 },
      { weight: "500g", price: 480, stock: 20 },
      { weight: "1000g", price: 920, stock: 10 }
    ],
    isEnabled: true
  },
  {
    id: "prod-9",
    name: "Rose Rapture Roll",
    description: "Rose-infused cream roll with dried petals",
    categoryId: "cat-2",
    image: "",
    priceByWeight: [
      { weight: "150g", price: 170, stock: 28 },
      { weight: "500g", price: 520, stock: 18 },
      { weight: "1000g", price: 980, stock: 10 }
    ],
    isEnabled: true
  },
  {
    id: "prod-10",
    name: "Velvet Coconut Cube",
    description: "Silky coconut barfi with dark chocolate drizzle",
    categoryId: "cat-2",
    image: "",
    priceByWeight: [
      { weight: "150g", price: 150, stock: 35 },
      { weight: "500g", price: 450, stock: 22 },
      { weight: "1000g", price: 850, stock: 12 }
    ],
    isEnabled: true
  },
  {
    id: "prod-11",
    name: "Caramel Kaju Crush",
    description: "Caramelized cashew clusters with sea salt",
    categoryId: "cat-2",
    image: "",
    priceByWeight: [
      { weight: "150g", price: 190, stock: 25 },
      { weight: "500g", price: 580, stock: 15 },
      { weight: "1000g", price: 1100, stock: 8 }
    ],
    isEnabled: true
  },
  {
    id: "prod-12",
    name: "Sugar Rush Bites",
    description: "Mini sugar-coated mawa bites",
    categoryId: "cat-2",
    image: "",
    priceByWeight: [
      { weight: "150g", price: 140, stock: 40 },
      { weight: "500g", price: 420, stock: 25 },
      { weight: "1000g", price: 800, stock: 14 }
    ],
    isEnabled: true
  },
  {
    id: "prod-13",
    name: "Brownie Barfi Bite",
    description: "Chocolate brownie meets traditional barfi",
    categoryId: "cat-2",
    image: "",
    priceByWeight: [
      { weight: "150g", price: 180, stock: 30 },
      { weight: "500g", price: 550, stock: 18 },
      { weight: "1000g", price: 1050, stock: 10 }
    ],
    isEnabled: true
  },
  {
    id: "prod-14",
    name: "Fusion Fudge Fiesta",
    description: "Indian spiced fudge with almonds",
    categoryId: "cat-2",
    image: "",
    priceByWeight: [
      { weight: "150g", price: 200, stock: 25 },
      { weight: "500g", price: 600, stock: 15 },
      { weight: "1000g", price: 1150, stock: 8 }
    ],
    isEnabled: true
  },
  {
    id: "prod-15",
    name: "Rasraj Royale",
    description: "Premium rasmalai in exotic fruit coulis",
    categoryId: "cat-2",
    image: "",
    priceByWeight: [
      { weight: "150g", price: 190, stock: 28 },
      { weight: "500g", price: 580, stock: 16 },
      { weight: "1000g", price: 1100, stock: 9 }
    ],
    isEnabled: true
  },
  // Royal Reserve Collection
  {
    id: "prod-16",
    name: "Maharaja Melt",
    description: "Luxurious melt-in-mouth kaju katli with edible gold",
    categoryId: "cat-3",
    image: "",
    priceByWeight: [
      { weight: "500g", price: 550, stock: 20 },
      { weight: "750g", price: 780, stock: 12 },
      { weight: "1000g", price: 1000, stock: 8 }
    ],
    isEnabled: true
  },
  {
    id: "prod-17",
    name: "Kesar Crown Delight",
    description: "Saffron-infused royal peda with pistachios",
    categoryId: "cat-3",
    image: "",
    priceByWeight: [
      { weight: "500g", price: 600, stock: 18 },
      { weight: "750g", price: 850, stock: 10 },
      { weight: "1000g", price: 1100, stock: 6 }
    ],
    isEnabled: true
  },
  {
    id: "prod-18",
    name: "Shahi Bliss Bar",
    description: "Seven-layer rich barfi with dry fruits",
    categoryId: "cat-3",
    image: "",
    priceByWeight: [
      { weight: "500g", price: 580, stock: 15 },
      { weight: "750g", price: 820, stock: 10 },
      { weight: "1000g", price: 1050, stock: 7 }
    ],
    isEnabled: true
  },
  {
    id: "prod-19",
    name: "Nawab's Nectar",
    description: "Royal cham cham in rose syrup",
    categoryId: "cat-3",
    image: "",
    priceByWeight: [
      { weight: "500g", price: 620, stock: 16 },
      { weight: "750g", price: 880, stock: 10 },
      { weight: "1000g", price: 1150, stock: 6 }
    ],
    isEnabled: true
  },
  {
    id: "prod-20",
    name: "Golden Ghee Treat",
    description: "Pure desi ghee ladoo with cardamom essence",
    categoryId: "cat-3",
    image: "",
    priceByWeight: [
      { weight: "500g", price: 650, stock: 20 },
      { weight: "750g", price: 920, stock: 12 },
      { weight: "1000g", price: 1200, stock: 8 }
    ],
    isEnabled: true
  },
  {
    id: "prod-21",
    name: "Choco Ras Bomb",
    description: "Chocolate-coated rasgulla with white chocolate filling",
    categoryId: "cat-3",
    image: "",
    priceByWeight: [
      { weight: "500g", price: 570, stock: 22 },
      { weight: "750g", price: 800, stock: 14 },
      { weight: "1000g", price: 1020, stock: 9 }
    ],
    isEnabled: true
  },
  {
    id: "prod-22",
    name: "Mocha Mithai Pop",
    description: "Coffee-infused mithai with chocolate ganache",
    categoryId: "cat-3",
    image: "",
    priceByWeight: [
      { weight: "500g", price: 560, stock: 18 },
      { weight: "750g", price: 790, stock: 11 },
      { weight: "1000g", price: 1000, stock: 7 }
    ],
    isEnabled: true
  },
  {
    id: "prod-23",
    name: "Desi Drip Delight",
    description: "Traditional kalakand with modern presentation",
    categoryId: "cat-3",
    image: "",
    priceByWeight: [
      { weight: "500g", price: 590, stock: 20 },
      { weight: "750g", price: 840, stock: 13 },
      { weight: "1000g", price: 1080, stock: 8 }
    ],
    isEnabled: true
  },
  {
    id: "prod-24",
    name: "Swagwali Mithai",
    description: "Premium assorted sweets gift box",
    categoryId: "cat-3",
    image: "",
    priceByWeight: [
      { weight: "500g", price: 580, stock: 25 },
      { weight: "750g", price: 820, stock: 15 },
      { weight: "1000g", price: 1050, stock: 10 }
    ],
    isEnabled: true
  },
  {
    id: "prod-25",
    name: "Malai Moon Supreme",
    description: "Ultimate malai creation with edible silver",
    categoryId: "cat-3",
    image: "",
    priceByWeight: [
      { weight: "500g", price: 680, stock: 15 },
      { weight: "750g", price: 950, stock: 10 },
      { weight: "1000g", price: 1250, stock: 6 }
    ],
    isEnabled: true
  }
];

export const initialOrders: Order[] = [];

export const initialUsers: User[] = [
  {
    id: "user-admin-1",
    email: "admin@mithaipalace.com",
    name: "Shop Admin",
    role: "admin"
  }
];

// Admin credentials for demo
export const ADMIN_CREDENTIALS = {
  email: "admin@mithaipalace.com",
  password: "admin123"
};
