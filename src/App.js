import React from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Layout } from "./hoc/Layout/Layout";
import { BurgerBuilder } from "./containers/BurgerBuilder/BurgerBuilder";
import { checkout as Checkout } from "./containers/Checkout/Checkout";
import { orders as Orders } from "./containers/Orders/Orders";
import { Auth } from "./containers/Auth/Auth";
import { Logout } from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
}

export const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(props => {
  React.useEffect(() => {
    props.handleTryAutoSignUp();
  }, []);

  let routes = <Switch>
    <Route path="/auth" component={Auth} />
    <Route path="/" exact component={BurgerBuilder} />
    <Redirect to="/" />
  </Switch>;

  if (props.isAuthenticated) {
    routes = <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/logout" component={Logout} />
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>;
  }

  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}));
