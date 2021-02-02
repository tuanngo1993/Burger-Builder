import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { instance } from "../../axios-orders";
import * as actions from "../../store/actions/index";

import { burger as Burger } from "../../components/Burger/Burger";
import { buildControls as BuildControls } from "../../components/Burger/BuildControls/BuildControls";
import { context as Context } from "../../hoc/Context/Context";
import { modal as Modal } from "../../components/UI/Modal/Modal";
import { orderSummary as OrderSummary } from "../../components/Burger/OrderSummary/OrderSummary";
import { spinner as Spinner } from "../../components/UI/Spinner/Spinner";
import { withError as WithError } from "../../hoc/WithError/WithError";
import { aux as Aux } from "../../hoc/Aux/Aux";

export const BurgerBuilder = WithError((props => {
  const [ordering, setOrdering] = React.useState(false); // Open or close order modal
  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => !!state.auth.token);

  const dispatch = useDispatch();
  const handleAddIngredient = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
  const handleRemoveIngredient = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
  const handleInitIngredients = () => dispatch(actions.initIngredients());
  const handlePurchaseInit = () => dispatch(actions.purchaseInit());
  const handleSetRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  // 1. Fetch the ingredients data from server
  // 2. Set ingredients data to state
  React.useEffect(() => {
    handleInitIngredients();
  }, []);

  const handleOrderContinue = () => {
    handlePurchaseInit();
    props.history.push({
      pathname: "/checkout"
    });
  };

  // Switch value of ordering state to open or close order modal
  const handleToggleOrderModal = () => {
    if (isAuthenticated) {
      setOrdering(prevOrdering => !prevOrdering);
    } else {
      handleSetRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  // Check whether ingredients has any or not at all ? 
  // Yes: set purchasable state to true
  // No: set purchasable state to false
  const handleUpdatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients).map(
      ingredient => ingredients[ingredient]
    ).reduce((sum, price) => sum + price, 0);

    return sum > 0;
  };

  const disableInfo = { ...ingredients };

  // Turn into boolean array
  // True: it is fine to enable minus button
  // False: disable the minus button in Build Control
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>Cannot load the ingredients!!</p> : <Spinner />;

  if (ordering) {
    orderSummary = <Spinner />;
  }

  if (ingredients) {
    burger = <Aux>
      <Burger ingredients={ingredients} />
      <BuildControls
        disableInfo={disableInfo}
        purchasable={handleUpdatePurchase(ingredients)}
      />;
    </Aux>
    orderSummary = <OrderSummary key={"order-summary"} ingredients={ingredients} onClick={handleOrderContinue} />;
  }

  return <Context.Provider
    value={{
      onAdd: handleAddIngredient,
      onRemove: handleRemoveIngredient,
      onClick: handleToggleOrderModal,
      price: totalPrice,
      show: ordering,
      isAuthenticated: isAuthenticated
    }}
  >
    <Modal>
      {orderSummary}
    </Modal>
    {burger}
  </Context.Provider>;
}), instance);
