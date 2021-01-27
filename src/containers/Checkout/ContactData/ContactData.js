import React from "react";
import { connect } from "react-redux";

import classes from "./ContactData.css";

import { button as Button } from "../../../components/UI/Button/Button";
import { instance } from "../../../axios-orders";
import { spinner as Spinner } from "../../../components/UI/Spinner/Spinner";
import { input as Input } from "../../../components/UI/Input/Input";
import { withError as WithError } from "../../../hoc/WithError/WithError";
import * as orderBurgerActions from "../../../store/actions/index";

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    order: state.order.order
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleOrderBurger: (orderData) => dispatch(orderBurgerActions.purchaseBurger(orderData)),
  };
};

export const contactData = connect(mapStateToProps, mapDispatchToProps)(WithError(props => {
  const [order, setOrder] = React.useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name"
      },
      value: "",
      validation: {
        require: true,
        minLength: 5
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street"
      },
      value: "",
      validation: {
        require: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code"
      },
      value: "",
      validation: {
        require: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Email"
      },
      value: "",
      validation: {
        require: true
      },
      valid: false,
      touched: false
    },
    delivery: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Delivery fast" },
          { value: "cheapest", displayValue: "Delivery slow" }
        ],
      },
      value: "fastest",
      validation: {},
      valid: true
    },
  });

  // 2. Create a data
  // 4. Then set stop rendering spinner and close order modal
  const handleOrder = (e) => {
    e.preventDefault();

    const formData = {}; // 2

    for (let key in order) {
      if (!order[key].valid) return;
      formData[key] = order[key].value;
    };


    formData.ingredients = props.ingredients;
    formData.price = props.price;


    props.handleOrderBurger(formData);
  };

  const handleChangeInput = (id, e) => {
    let orderElement = { ...order };
    orderElement[id].value = e.target.value;
    orderElement[id].valid = checkValidity(e.target.value, orderElement[id].validation);
    orderElement[id].touched = true;
    console.log(orderElement);

    setOrder(orderElement);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.require) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }

    return isValid;
  }

  const formElementArray = [];
  for (let key in order) {
    formElementArray.push({
      id: key,
      config: order[key]
    });
  }

  return <div className={classes.ContactData}>
    <h4>Enter your Contact Data</h4>
    {
      props.loading
        ? <Spinner />
        : <form onSubmit={handleOrder}>
          {
            formElementArray.map(
              element => <Input
                key={element.id}
                inputtype={element.config.elementType}
                elementconfig={element.config.elementConfig}
                value={element.config.value}
                invalid={!element.config.valid}
                touched={element.config.touched}
                onChange={handleChangeInput.bind(this, element.id)} />
            )
          }
          <Button btnType="Success">ORDER</Button>
        </form>
    }
  </div>;
}, instance))