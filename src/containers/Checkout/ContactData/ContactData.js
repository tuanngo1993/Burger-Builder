import React from "react";

import classes from "./ContactData.css";

import { button as Button } from "../../../components/UI/Button/Button";
import { instance } from "../../../axios-orders";
import { spinner as Spinner } from "../../../components/UI/Spinner/Spinner";

export const contactData = props => {
  const [orderState, setOrderState] = React.useState({
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  });

  // 1. Set loading state to true so that rendering spinner in case cannot fetch data
  // 2. Create a data
  // 3. Post data to server, and catch error as well
  // 4. Then set stop rendering spinner and close order modal
  const handleOrder = (e) => {
    e.preventDefault();

    setOrderState({ ...orderState, loading: true });  // 1
    const order = {                    // 2
      ingredients: props.ingredients,
      price: props.totalPrice,
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

    instance.post('/orders.json', order)  // 3
      .then(resolve => {
        setOrderState({ ...orderState, loading: false });
        props.history.push("/");
      })
      .catch(error => setOrderState({ ...orderState, loading: false }));
  };

  return <div className={classes.ContactData}>
    <h4>Enter your Contact Data</h4>
    {
      orderState.loading
        ? <Spinner />
        : <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
          <input className={classes.Input} type="text" name="street" placeholder="Street" />
          <input className={classes.Input} type="text" name="postal" placeholder="Postal" />
          <Button btnType="Success" onClick={handleOrder}>ORDER</Button>
        </form>
    }
  </div>;
};