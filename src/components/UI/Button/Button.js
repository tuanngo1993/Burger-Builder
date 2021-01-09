import React from "react";

import classes from "./Button.css"

export const button = props => <button 
	className={[classes.Button, classes[props.btnType]].join(" ")}
	onClick={props.onClick}
>
	{props.children}
</button>;