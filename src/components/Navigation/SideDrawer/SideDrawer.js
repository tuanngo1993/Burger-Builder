import React from "react";

import classes from "./SideDrawer.css";

import {logo as Logo} from "../../Logo/Logo";
import {navigationItems as NavigationItems} from "../NavigationItems/NavigationItems";
import {backdrop as Backdrop} from "../../UI/Backdrop/Backdrop"
import {aux as Aux} from "../../../hoc/Aux/Aux";
import {context as Context} from "../../../hoc/Context/Context";

export const sideDrawer = props => {
	const context = React.useContext(Context);
	let attachedClasses = [classes.SideDrawer, classes.Close];

	if(context.show) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return <Aux>
		<Backdrop />
		<div className={attachedClasses.join(" ")}>
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav>
				<NavigationItems />
			</nav>
		</div>
	</Aux>
};