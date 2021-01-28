import * as actionTypes from "./actionTypes";
import { instance } from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  }
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  }
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    // get from link: https://console.firebase.google.com/u/0/project/react-my-burger-48670/database/react-my-burger-48670-default-rtdb/data
    instance.get("https://react-my-burger-48670-default-rtdb.firebaseio.com/ingredients.json")  // NOTE: must add ".json" at the end of url
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};