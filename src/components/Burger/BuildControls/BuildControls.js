import React from "react";

import classes from "./BuildControls.css";

import {buildControl as BuildControl} from "./BuildControl/BuildControl";

const controls = [
	{label: "Salad", type: "salad"},
	{label: "Bacon", type: "bacon"},
	{label: "Cheese", type: "cheese"},
	{label: "Meat", type: "meat"}
];

export const buildControls = props => <div className={classes.BuildControls}>
	<p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
	{
		controls.map(ctrl => <BuildControl
			disable={props.disableInfo[ctrl.type]}
			type={ctrl.type} key={ctrl.label}
			label={ctrl.label} 
		/>)
	}
</div>;