import React from "react";

import classes from "./Layout.css";

import { aux as Aux } from "../../hoc/Aux";

export const layout = props => <Aux>
	<div>Tooltips, SideDrawer, Backdrop</div>
	<main className={classes.Content}>
		{props.children}
	</main>
</Aux>;