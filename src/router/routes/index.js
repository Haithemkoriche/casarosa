import { lazy } from "react";

// ** Document title
const TemplateTitle = "%s - TREX";

// ** Default Route
const DefaultRoute = "/dashboard";

// ** Merge Routes
const Routes = [
  {
    path: "/login",
    component: lazy(() => import("../../views/pages/Login")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/error",
    component: lazy(() => import("../../views/pages/Error")),
    layout: "BlankLayout",
  },
  {
    path: "/dashboard",
    component: lazy(() => import("../../views/pages/Dashboard")),
  },
  {
    path: "/stores",
    component: lazy(() => import("../../views/pages/Stores")),
  },
  {
    path: "/store/:id/:store",
    component: lazy(() => import("../../views/pages/Store")),
  },
  {
    path: "/products",
    component: lazy(() => import("../../views/pages/Products")),
  },
  {
    path: "/alerts",
    component: lazy(() => import("../../views/pages/Alerts")),
  },
  {
    path: "/alert/:id",
    component: lazy(() => import("../../views/pages/Alert")),
  },
  {
    path: "/history/:id",
    component: lazy(() => import("../../views/pages/History")),
  },
];

export { DefaultRoute, TemplateTitle, Routes };
