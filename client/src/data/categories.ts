import { IconType } from "react-icons";
import { LuShoppingBasket } from "react-icons/lu";
import { MdOutlineFastfood, MdQuestionMark } from "react-icons/md";

interface categoryType {
  name: string;
  icon: IconType;
}

export const categories: categoryType[] = [
  {
    name: "Restaurants",
    icon: MdOutlineFastfood,
  },
  {
    name: "Groceries",
    icon: LuShoppingBasket,
  },
  {
    name: "Fuel",
    icon: MdQuestionMark,
  },
  {
    name: "Rent",
    icon: MdQuestionMark,
  },
  {
    name: "Education",
    icon: MdQuestionMark,
  },
  {
    name: "Trips",
    icon: MdQuestionMark,
  },
  {
    name: "Medical",
    icon: MdQuestionMark,
  },
  {
    name: "Pocket Money",
    icon: MdQuestionMark,
  },
];
