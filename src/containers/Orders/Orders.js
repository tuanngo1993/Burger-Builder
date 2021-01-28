import React from "react";
import { connect } from "react-redux";

import { order as Order } from "../../components/Order/Order";
import { instance } from "../../axios-orders";
import { spinner as Spinner } from "../../components/UI/Spinner/Spinner";
import { withError as WithError } from "../../hoc/WithError/WithError";
import * as actions from "../../store/actions/index";

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export const orders = connect(mapStateToProps, mapDispatchToProps)(WithError(props => {

  React.useEffect(() => {
    props.handleFetchOrders(props.token, props.userId);
  }, []);

  return <div>
    {
      props.loading
        ? <Spinner />
        : props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)
    }
  </div>;
}, instance));