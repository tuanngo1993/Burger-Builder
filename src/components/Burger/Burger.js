import React from "react";
import { withRouter } from "react-router-dom";

import classes from "./Burger.css";

import { burgerIngredient as BurgerIngredient } from "./BurgerIngredient/BurgerIngredient";

export const burger = withRouter(props => {
  let transformedIngredients = Object.keys(props.ingredients).map(
    ingredient => [...Array(props.ingredients[ingredient])].map(
      (_, i) => <BurgerIngredient key={`${ingredient}-${i}`} type={ingredient} />
    )
  ).reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start addding ingredients!</p>;
  }

  return <div className={classes.Burger}>
    <BurgerIngredient type="bread-top" />
    {transformedIngredients}
    <BurgerIngredient type="bread-bottom" />
  </div>
});