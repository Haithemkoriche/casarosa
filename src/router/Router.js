// ** React Imports
import { Suspense, lazy, Fragment } from "react";
import { BrowserRouter as AppRouter, Routes, Route, Navigate } from "react-router-dom";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";

// ** Routes & Default Routes
import { DefaultRoute, Routes as AppRoutes } from "./routes"; // Routes renamed to avoid conflict

// ** Lazy load pages
const NotAuthorized = lazy(() => import("@src/views/pages/NotAuthorized"));
const Error = lazy(() => import("@src/views/pages/Error"));

const Router = () => {
  // ** Layouts mapping
  const Layouts = { BlankLayout, VerticalLayout, HorizontalLayout };

  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layoutKey) => {
      const LayoutTag = Layouts[layoutKey];
      const LayoutRoutes = AppRoutes.filter(route => route.layout === layoutKey || (!route.layout && layoutKey === 'VerticalLayout'));

      return LayoutRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <LayoutTag>
              <Suspense fallback={<div>Loading...</div>}>
                <route.component />
              </Suspense>
            </LayoutTag>
          }
        />
      ));
    });
  };

  return (
    <AppRouter basename={process.env.REACT_APP_BASENAME}>
      <Routes>
        {/* Redirect to default route or login */}
        <Route path="/" element={<Navigate to={localStorage.getItem("on") ? DefaultRoute : "/login"} />} />

        {/* Not authorized route */}
        <Route
          path="/misc/not-authorized"
          element={
            <BlankLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <NotAuthorized />
              </Suspense>
            </BlankLayout>
          }
        />

        {/* All other routes */}
        {ResolveRoutes()}

        {/* Error route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </AppRouter>
  );
};

export default Router;
