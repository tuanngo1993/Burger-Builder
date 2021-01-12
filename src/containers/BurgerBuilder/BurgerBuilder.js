import React from "react";

import { instance } from "../../axios-orders";

import { burger as Burger } from "../../components/Burger/Burger";
import { buildControls as BuildControls } from "../../components/Burger/BuildControls/BuildControls";
import { context as Context } from "../../hoc/context";
import { modal as Modal } from "../../components/UI/Modal/Modal";
import { orderSummary as OrderSummary } from "../../components/Burger/OrderSummary/OrderSummary";
import { spinner as Spinner } from "../../components/UI/Spinner/Spinner";
import { withError as WithError } from "../../hoc/withError";
import { aux as Aux } from "../../hoc/Aux";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 0.8
};
class BurgerBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: null,
      totalPrice: 0,
      purchasable: false,  // Disable or enable order button in Build Controls
      ordering: false,     // Open or close order modal
      loading: false,      // Display or remove spinner 
      error: false         // Check there are any errors 
    };

    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
    this.handleToggleOrderModal = this.handleToggleOrderModal.bind(this);
    this.handleOrderContinue = this.handleOrderContinue.bind(this);
  }
  // 1. Fetch the ingredients data from server
  // 2. Set ingredients data to state
  componentDidMount() {
    instance.get("https://react-my-burger-48670-default-rtdb.firebaseio.com/%C3%ACngredients.json")  // NOTE: must add ".json" at the end of url
      .then(response => this.setState({ ingredients: response.data }))
      .catch(error => this.setState({error: true}));
  }

  // 1. Set loading state to true so that rendering spinner in case cannot fetch data
  // 2. Create a data
  // 3. Post data to server, and catch error as well
  // 4. Then set stop rendering spinner and close order modal
  handleOrderContinue() {
    this.setState({ loading: true });  // 1
    const order = {                    // 2
      ingredients: this.state.ingredients, 
      price: this.state.totalPrice,  
      customer: {
        name: "Tuan Ngo",
        address: {
          street: "79 Do Quang",
          zipCode: "550000",
          country: "Vietnam"
        },
        email: "tuan@test.com",
      },
      deliveryMethod: "fastest"
    };

    instance.post('/orders', order)  // 3
      .then(resolve => this.setState({ loading: false, ordering: false }))
      .catch(error => this.setState({ loading: false, ordering: false }));
  }

  // Switch value of ordering state to open or close order modal
  handleToggleOrderModal() {
    this.setState((prevState, _) => ({ ordering: !prevState.ordering }));
  }

  // Check whether ingredients has any or not at all ? 
  // Yes: set purchasable state to true
  // No: set purchasable state to false
  handleUpdatePurchase(ingredients) {
    const sum = Object.keys(ingredients).map(
      ingredient => ingredients[ingredient]
    ).reduce((sum, price) => sum + price, 0);

    this.setState({ purchasable: sum > 0 });
  }

  // Calculate add or remove ingredients in burger
  handleIngredient(type, action) {
    const oldCount = this.state.ingredients[type];
    let updatedCount;
    if (action === "add") {
      updatedCount = oldCount + 1;
    } else if (action === "remove") {
      if (oldCount <= 0) return;
      updatedCount = oldCount - 1;
    }
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceIngredient = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    let updatedPrice;
    if (action === "add") {
      updatedPrice = oldPrice + priceIngredient;
    } else if (action === "remove") {
      updatedPrice = oldPrice - priceIngredient;
    }

    this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
    this.handleUpdatePurchase(updatedIngredients);
  }

  handleAddIngredient(type) {
    this.handleIngredient(type, "add");
  }

  handleRemoveIngredient(type) {
    this.handleIngredient(type, "remove");
  }

  render() {
    const disableInfo = { ...this.state.ingredients };

    // Turn into boolean array
    // True: it is fine to enable minus button
    // False: disable the minus button in Build Control
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Cannot load the ingredients!!</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          disableInfo={disableInfo}
          purchasable={this.state.purchasable}
        />;
      </Aux>
      orderSummary = <OrderSummary key={"order-summary"} ingredients={this.state.ingredients} onClick={this.handleOrderContinue} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return <Context.Provider
      value={{
        onAdd: this.handleAddIngredient,
        onRemove: this.handleRemoveIngredient,
        onClick: this.handleToggleOrderModal,
        price: this.state.totalPrice,
        show: this.state.ordering
      }}
    >
      <Modal>
        {orderSummary}
      </Modal>
      {burger}
    </Context.Provider>;
  }
}

export default WithError(BurgerBuilder, instance);