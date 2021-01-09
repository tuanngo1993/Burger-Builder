import React from "react";

import classes from "./Backdrop.css";

import {context as Context} from "../../../hoc/context";

export const backdrop = props => props.show && <Context.Consumer>
	{
		context => <div className={classes.Backdrop} onClick={context.onClick} />
	}
</Context.Consumer>;