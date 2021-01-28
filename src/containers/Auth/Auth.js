import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Auth.css";

import { input as Input } from "../../components/UI/Input/Input";
import { button as Button } from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import { spinner as Spinner } from "../../components/UI/Spinner/Spinner";

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    handleSetRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export const Auth = connect(mapStateToProps, mapDispatchToProps)(props => {
  const [controls, setControls] = React.useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address"
      },
      value: "",
      validation: {
        require: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        require: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [isSignup, setIsSignUp] = React.useState(true);

  React.useEffect(() => {
    if(!props.building && props.authRedirectPath !== "/") {
      props.handleSetRedirectPath();
    }
  },[]);

  const formElementArray = [];
  for (let key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key]
    });
  }

  const handleCheckValidity = (value, rules) => {
    let isValid = true;

    if (rules.require) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
    }

    return isValid;
  }

  const handleChangeInput = (controlName, e) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: e.target.value,
        valid: handleCheckValidity(e.target.value, controls[controlName].validation),
        touched: true
      }
    };

    setControls(updatedControls);
  };

  let form = formElementArray.map(element => <Input
    key={element.id}
    inputtype={element.config.elementType}
    elementconfig={element.config.elementConfig}
    value={element.config.value}
    invalid={!element.config.valid ? 1 : 0}
    touched={element.config.touched ? 1 : 0}
    onChange={handleChangeInput.bind(this, element.id)}
  />);
  let errorMessage = null;

  if (props.loading) {
    form = <Spinner />;
  }

  if (props.error) {
    errorMessage = <p>
      {props.error.message}
    </p>
  }

  const handleSubmit = e => {
    e.preventDefault();
    props.handleAuth(controls.email.value, controls.password.value, isSignup);
  };

  const handleSwitchAuthMode = () => {
    setIsSignUp(!isSignup);
  };

  return <div className={classes.Auth}>
    {props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
    {errorMessage}
    <form onSubmit={handleSubmit}>
      {form}
      <Button btnType="Success">Submit</Button>
    </form>
    <Button onClick={handleSwitchAuthMode} btnType="Danger">SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}</Button>
  </div>;
});