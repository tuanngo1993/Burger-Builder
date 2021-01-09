import React from "react";

import classes from "./Layout.css";

import { context as Context } from "../../hoc/context";
import {toolbar as Toolbar} from "../Navigation/Toolbar/Toolbar";
import {sideDrawer as SideDrawer} from "../Navigation/SideDrawer/SideDrawer";

export class Layout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showSideDrawer: false
		};

		this.handleToggleSideDrawer = this.handleToggleSideDrawer.bind(this);
	}

	handleToggleSideDrawer() {
		this.setState((prevState, _) => ({showSideDrawer: !prevState.showSideDrawer}));
	}

	render() {
		return <Context.Provider 
			value={{
				onClick: this.handleToggleSideDrawer,
				show: this.state.showSideDrawer
			}}
		>
			<Toolbar />
			<SideDrawer />
			<main className={classes.Content}>
				{this.props.children}
			</main>
		</Context.Provider>;
	}
}