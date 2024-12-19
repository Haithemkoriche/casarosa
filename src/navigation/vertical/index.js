import { BarChart, Home, Box, AlertCircle } from "react-feather";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: "/dashboard",
  },
  {
    id: "stores",
    title: "Stores",
    icon: <BarChart size={20} />,
    navLink: "/stores",
  },
  {
    id: "products",
    title: "Products",
    icon: <Box size={20} />,
    navLink: "/products",
  },
  {
    id: "alerts",
    title: "Alerts",
    icon: <AlertCircle size={20} />,
    navLink: "/alerts",
  },
];
