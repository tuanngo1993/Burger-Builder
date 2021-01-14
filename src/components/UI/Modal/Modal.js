import React from "react";

import classes from "./Modal.css";

import { aux as Aux } from "../../../hoc/Aux/Aux";
import { backdrop as Backdrop } from "../Backdrop/Backdrop";
import {context as Context} from "../../../hoc/Context/Context";

export const modal = (props) => {
	return <Context.Consumer>
		{
			context => <Aux>
				<Backdrop />
				<div 
					className={classes.Modal}
					style={{
						transform: context.show ? "translateY(0)" : "translateY(-100vh)",
						opacity: context.show ? "1" : "0"
					}}
				>
					{props.children}
				</div>
			</Aux>
		}
	</Context.Consumer>
};