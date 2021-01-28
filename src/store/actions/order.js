import * as actionTypes from "./actionTypes";
import { instance } from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    console.log(token);
    dispatch(purchaseBurgerStart());
    instance.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        console.log(response);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        console.log("failed");
        dispatch(purchaseBurgerFailed(error.response.data.error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFailed = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    // check if passed auth through token key before fetch orders
    const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    instance.get("/orders.json" + queryParams)
      .then(response => {
        const fetchedOrders = [];

        for (const key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }

        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFailed(error));
      });
  };
};