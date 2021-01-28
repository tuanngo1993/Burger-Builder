import React from "react";

import classes from "./BuildControls.css";

import {buildControl as BuildControl} from "./BuildControl/BuildControl";
import {context as Context} from "../../../hoc/Context/Context";

const controls = [
	{label: "Salad", type: "salad"},
	{label: "Bacon", type: "bacon"},
	{label: "Cheese", type: "cheese"},
	{label: "Meat", type: "meat"}
];

export const buildControls = props => <Context.Consumer>
	{
		context => <div className={classes.BuildControls}>
			<p>Current Price: <strong>{context.price.toFixed(2)}$</strong></p>
			{
				controls.map(ctrl => <BuildControl
					disable={props.disableInfo[ctrl.type]}
					type={ctrl.type} key={ctrl.label}
					label={ctrl.label} 
				/>)
			}
			<button
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={context.onClick}
			>
				{context.isAuthenticated ? "ORDER BUTTON" : "SIGN UP TO ORDER"}
			</button>
		</div>
	}
</Context.Consumer>;