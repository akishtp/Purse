import { IconType } from "react-icons";
import { LuShoppingBasket } from "react-icons/lu";
import { MdOutlineFastfood } from "react-icons/md";

interface categoryType {
  name: string;
  icon: IconType;
}

export const categories: categoryType[] = [
  {
    name: "Groceries",
    icon: LuShoppingBasket,
  },
  {
    name: "Restaurants",
    icon: MdOutlineFastfood,
  },
];
