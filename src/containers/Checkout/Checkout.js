import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { checkoutSummary as CheckoutSummary } from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { contactData as ContactData } from "./ContactData/ContactData";


const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
};

export const checkout = connect(mapStateToProps)(props => {
  
  const handleContinueCheckout = () => {
    props.history.replace("/checkout/contact-data");
  };

  const handleCancelCheckout = () => {
    props.history.goBack();
  };

  let summary = <Redirect to="/" />;

  if (props.ingredients) {
    const purchasedRedirect = props.purchased && <Redirect to="/" />;
    summary = <div>
      {purchasedRedirect}
      <CheckoutSummary
        ingredients={props.ingredients}
        onClickCancel={handleContinueCheckout}
        onClickContinue={handleCancelCheckout} />
      <Route path={props.match.path + "/contact-data"} component={ContactData} />
    </div>;
  }

  return summary;
});
