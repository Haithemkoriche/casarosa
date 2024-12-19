import React, { useContext } from "react";
import { ThemeColors } from "../../utility/context/ThemeColors";

const FullScreenLoader = ({ component }) => {
  const { colors } = useContext(ThemeColors);
  return (
    <>
      <div className="fullscreen_loader" id="loader">
        <div className="loader" style={{ borderTopColor: colors.primary.main, borderBottomColor: colors.primary.main }}></div>
      </div>
      {component}
    </>
  );
};

export default FullScreenLoader;
