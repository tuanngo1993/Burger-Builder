import * as actionTypes from "../actions/actionTypes";

const initalState = {
  orders: [],
  loading: false,
  purchased: false
};

export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: 
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newData = { ...action.orderData, id: action.id };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newData)
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_FAILED: 
      return {
        ...state,
      }
    default:
      return state;
  }
};