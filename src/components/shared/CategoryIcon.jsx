import {
  Home, ShoppingCart, Car, Baby, Pill, BookOpen, Shirt, UtensilsCrossed,
  Gamepad2, Dumbbell, Smartphone, Plane, ShoppingBag, Shield, PawPrint,
  PiggyBank, Package, Zap, Droplets, Gift, TrendingUp, Fuel, Sparkles, Wrench,
} from 'lucide-react';

export const CAT_ICONS = {
  housing: Home, rent: Home,
  food: ShoppingCart, groceries: ShoppingCart,
  transport: Car,
  kids: Baby,
  health: Pill, pharma: Pill,
  education: BookOpen,
  clothing: Shirt, fashion: Shirt,
  dining: UtensilsCrossed, restaurants: UtensilsCrossed,
  leisure: Gamepad2, entertainment: Gamepad2,
  sport: Dumbbell,
  telecom: Smartphone, subscriptions: Smartphone,
  travel: Plane,
  shopping: ShoppingBag,
  insurance: Shield,
  pets: PawPrint,
  savings: PiggyBank,
  income: TrendingUp,
  electricity: Zap,
  water: Droplets,
  gifts: Gift,
  fuel: Fuel,
  cosmetics: Sparkles,
  home_maintenance: Wrench,
  other: Package,
};

export default function CategoryIcon({ category, size = 16 }) {
  const Icon = CAT_ICONS[category] || Package;
  return <Icon size={size} strokeWidth={1.8} />;
}
