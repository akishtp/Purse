import {
  CandlestickChart,
  CircleHelp,
  Coffee,
  Drumstick,
  EggFried,
  FerrisWheel,
  Fuel,
  HandCoins,
  Home,
  LucideProps,
  Sandwich,
  ShoppingBag,
  TramFront,
} from "lucide-react";

export interface CategoryType {
  name: string;
  icon: React.FC<LucideProps>;
}

export const categories = [
  { name: "Breakfast", icon: EggFried },
  { name: "Lunch", icon: Sandwich },
  { name: "Snacks", icon: Coffee },
  { name: "Dinner", icon: Drumstick },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Rent", icon: Home },
  { name: "Transportation", icon: TramFront },
  { name: "Fuel", icon: Fuel },
  { name: "Entertainment", icon: FerrisWheel },
  { name: "Investement", icon: CandlestickChart },
  { name: "Income", icon: HandCoins },
  { name: "Other", icon: CircleHelp },
];
