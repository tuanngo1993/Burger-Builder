import React from "react";

import classes from "./BuildControl.css";

import { context as Context } from "../../../../hoc/context";

export const buildControl = props => <Context.Consumer>
	{
		context => <div className={classes.BuildControl}>
			<div className={classes.Label}>{props.label}</div>
			<button
				className={classes.Less}
				onClick={context.onRemove.bind(this, props.type)}
				disabled={props.disable}
			>
				Less
			</button>
			<button
				className={classes.More}
				onClick={context.onAdd.bind(this, props.type)}
			>
				More
			</button>
		</div>
	}	
</Context.Consumer>;