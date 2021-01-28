import React from "react";
import { connect } from "react-redux";

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
class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ordering: false,     // Open or close order modal
    };

    this.handleToggleOrderModal = this.handleToggleOrderModal.bind(this);
    this.handleOrderContinue = this.handleOrderContinue.bind(this);
  }
  // 1. Fetch the ingredients data from server
  // 2. Set ingredients data to state
  componentDidMount() {
    this.props.handleInitIngredients();
  }

  handleOrderContinue() {
    this.props.handlePurchaseInit();
    this.props.history.push({
      pathname: "/checkout"
    });
  }

  // Switch value of ordering state to open or close order modal
  handleToggleOrderModal() {
    if(this.props.isAuthenticated) {
      this.setState((prevState, _) => ({ ordering: !prevState.ordering }));
    } else {
      this.props.handleSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  }

  // Check whether ingredients has any or not at all ? 
  // Yes: set purchasable state to true
  // No: set purchasable state to false
  handleUpdatePurchase(ingredients) {
    const sum = Object.keys(ingredients).map(
      ingredient => ingredients[ingredient]
    ).reduce((sum, price) => sum + price, 0);

    return sum > 0 ;
  }

  render() {
    const disableInfo = { ...this.props.ingredients };

    // Turn into boolean array
    // True: it is fine to enable minus button
    // False: disable the minus button in Build Control
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Cannot load the ingredients!!</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = <Aux>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          disableInfo={disableInfo}
          purchasable={this.handleUpdatePurchase(this.props.ingredients)}
        />;
      </Aux>
      orderSummary = <OrderSummary key={"order-summary"} ingredients={this.props.ingredients} onClick={this.handleOrderContinue} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return <Context.Provider
      value={{
        onAdd: this.props.handleAddIngredient,
        onRemove: this.props.handleRemoveIngredient,
        onClick: this.handleToggleOrderModal,
        price: this.props.totalPrice,
        show: this.state.ordering,
        isAuthenticated: this.props.isAuthenticated
      }}
    >
      <Modal>
        {orderSummary}
      </Modal>
      {burger}
    </Context.Provider>;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: !!state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    handleRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    handleInitIngredients: () => dispatch(actions.initIngredients()),
    handlePurchaseInit: () => dispatch(actions.purchaseInit()),
    handleSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithError(BurgerBuilder, instance));