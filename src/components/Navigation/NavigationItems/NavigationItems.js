import React from "react";

import classes from "./NavigationItems.css"

import { navigationItem as Navigationitem } from "./NavigationItem/NavigationItem";
import { context as Context } from "../../../hoc/Context/Context";
import { aux as Aux } from "../../../hoc/Aux/Aux";

export const navigationItems = props => <Context.Consumer>
  {
    context => <ul className={classes.NavigationItems}>
      <Navigationitem link="/">Burgerr Builder</Navigationitem>
      {
        context.isAuthenticated
          ? <Aux>
              <Navigationitem link="/orders">Orders</Navigationitem>
              <Navigationitem link="/logout">Log out</Navigationitem>
            </Aux>
          : <Navigationitem link="/auth">Authenticate</Navigationitem>
      }
    </ul>
  }
</Context.Consumer>;