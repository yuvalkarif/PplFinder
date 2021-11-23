import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useFavorites } from "hooks";
import { Link, useLocation } from "react-router-dom";
import ROUTER from "routes";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const { pathname } = useLocation();
  const routesIndexes = Object.values(ROUTER);
  const [favorites, isInFavorites, addToFavorites] = useFavorites();
  useEffect(() => {
    if (pathname !== routesIndexes[value]) {
      routesIndexes.forEach((routeIndex, i) => {
        if (routeIndex === pathname) {
          setValue(i);
        }
      });
    }
  }, [pathname]);
  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label="Home"
          index={0}
          component={Link}
          to={{ pathname: ROUTER.HOME, state: { index: 0 } }}
        />
        <Tab
          label="Favorites"
          index={1}
          component={Link}
          to={{ pathname: ROUTER.FAVORITES, state: { index: 1 } }}
        />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
