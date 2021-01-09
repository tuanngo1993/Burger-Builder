import React from "react";

import classes from "./DrawerToggle.css";

import {context as Context} from "../../../../hoc/context";


export const drawerToggle = props => <Context.Consumer>
	{
		context => <div className={classes.DrawerToggle} onClick={context.onClick}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	}
</Context.Consumer>;