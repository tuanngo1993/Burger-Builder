import React from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";

import { context as Context } from "../Context/Context";
import { toolbar as Toolbar } from "../../components/Navigation/Toolbar/Toolbar";
import { sideDrawer as SideDrawer } from "../../components/Navigation/SideDrawer/SideDrawer";

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

export const Layout = connect(mapStateToProps)(props => {
  const [showSideDrawer, setShowSideDrawer] = React.useState(false);

  const handleToggleSideDrawer = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return <Context.Provider
    value={{
      onClick: handleToggleSideDrawer,
      show: showSideDrawer,
      isAuthenticated: props.isAuthenticated
    }}
  >
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Context.Provider>;
});