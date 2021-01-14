import React from "react";

import classes from "./CheckoutSummary.css";

import {burger as Burger} from "../../Burger/Burger";
import {button as Button} from "../../UI/Button/Button";

export const checkoutSummary = props => <div className={classes.CheckoutSummary}>
  <h1>Wh hope it tastes well!</h1>
  <div style={{ width: "100%", margin: "auto" }}>
    <Burger ingredients={props.ingredients} />
  </div>
  <Button btnType="Danger" onClick={props.onClickContinue}>CANCEL</Button>
  <Button btnType="Success" onClick={props.onClickCancel}>CONTINUE</Button>
</div>;