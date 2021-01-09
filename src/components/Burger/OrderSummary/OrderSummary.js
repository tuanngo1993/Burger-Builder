import React from "react";

import { aux as Aux } from "../../../hoc/Aux";
import {button as Button} from "../../UI/Button/Button";
import {context as Context} from "../../../hoc/context";

export const OrderSummary = props => {
	React.useEffect(() => {console.log("Order Summary")});

	const ingredientSummary = Object.keys(props.ingredients).map(
		ingredient => <li key={ingredient}>
			<span style={{textTransform: "capitalize"}}>{ingredient}</span>: {props.ingredients[ingredient]}
		</li>
	);

	return <Context.Consumer>
		{
			context => <Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with 	the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Prive: {context.price.toFixed(2)}$</strong></p>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" onClick={context.onClick}>CANCEL</Button>
				<Button btnType="Success" onClick={props.onClick} >CONTINUE</Button>
			</Aux>
		}
	</Context.Consumer>;
};