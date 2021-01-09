import React from "react";

import classes from "./Modal.css";

import { aux as Aux } from "../../../hoc/Aux";
import { backdrop as Backdrop } from "../Backdrop/Backdrop";

export const modal = props => <Aux>
		<Backdrop show={props.show} />
		<div 
			className={classes.Modal}
			style={{
				transform: props.show ? "translateY(0)" : "translateY(-100vh)",
				opacity: props.show ? "1" : "0"
			}}
		>
			{props.children}
		</div>
</Aux>;