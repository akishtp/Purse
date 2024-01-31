import { IconType } from "react-icons";
import { LuFuel, LuShoppingBasket } from "react-icons/lu";
import { MdOutlineFastfood, MdQuestionMark } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import { TbSchool } from "react-icons/tb";
import { MdTravelExplore } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { PiHandCoins } from "react-icons/pi";

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
    icon: LuFuel,
  },
  {
    name: "Rent",
    icon: HiOutlineHome,
  },
  {
    name: "Education",
    icon: TbSchool,
  },
  {
    name: "Trips",
    icon: MdTravelExplore,
  },
  {
    name: "Medical",
    icon: GiMedicines,
  },
  {
    name: "Pocket Money",
    icon: PiHandCoins,
  },
  {
    name: "Missing",
    icon: MdQuestionMark,
  },
];
