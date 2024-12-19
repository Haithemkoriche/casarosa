// ** Router Import
import Router from "./router/Router";
import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // Set the direction for RTL support based on localStorage
    if (localStorage.getItem("direction") === "rtl") {
      document.querySelector("html").dir = "rtl";
    }
  }, []);

  return <Router />;  // Loads the Router component
};

export default App;
