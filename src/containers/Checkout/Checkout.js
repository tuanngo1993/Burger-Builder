import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { checkoutSummary as CheckoutSummary } from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { contactData as ContactData } from "./ContactData/ContactData";


const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  }
};

export const checkout = connect(mapStateToProps)(props => {
  // const [ingredients, setIngredients] = React.useState({});
  // const [totalPrice, setTotalPrice] = React.useState(0);

  // React.useEffect(() => {
  //   const ingredients = {};

  //   for (let params of new URLSearchParams(props.location.search).entries()) {
  //     if (params[0] === "price") {
  //       setTotalPrice(+params[1]);
  //       console.log(totalPrice);
  //     } else {
  //       ingredients[params[0]] = +params[1];
  //     }
  //   }

  //   setIngredients(ingredients);
  // }, []);

  const handleContinueCheckout = () => {
    props.history.replace("/checkout/contact-data");
  };

  const handleCancelCheckout = () => {
    props.history.goBack();
  };

  return <div>
    <CheckoutSummary
      ingredients={props.ingredients}
      onClickCancel={handleContinueCheckout}
      onClickContinue={handleCancelCheckout} />
    <Route path={props.match.path + "/contact-data"} component={ContactData} />
  </div>;
});
