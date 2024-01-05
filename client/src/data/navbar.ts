import {
  IoBarChart,
  IoBarChartOutline,
  IoCalendarClear,
  IoCalendarClearOutline,
  IoHome,
  IoHomeOutline,
} from "react-icons/io5";

export const data = [
  {
    name: "Home",
    href: "/",
    iconOutline: IoHomeOutline,
    iconFill: IoHome,
  },
  {
    name: "Overview",
    href: "/overview",
    iconOutline: IoBarChartOutline,
    iconFill: IoBarChart,
  },
  {
    name: "Schedule",
    href: "/schedule",
    iconOutline: IoCalendarClearOutline,
    iconFill: IoCalendarClear,
  },
];
