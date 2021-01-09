import React from "react";

import classes from "./Toolbar.css"

import {logo as Logo} from "../../Logo/Logo";
import {navigationItems as NavigationItems} from "../NavigationItems/NavigationItems";
import {drawerToggle as DrawerToggle} from "../SideDrawer/DrawerToggle/DrawerToggle";

export const toolbar = props => <header className={classes.Toolbar}>
	<DrawerToggle />
	<div className={classes.Logo}>
		<Logo />
	</div>
	<nav className={classes.DesktopOnly}>
		<NavigationItems />
	</nav>
</header>;	