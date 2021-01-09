import React from "react";

import classes from "./Modal.css";

import { aux as Aux } from "../../../hoc/Aux";
import { backdrop as Backdrop } from "../Backdrop/Backdrop";
import {context as Context} from "../../../hoc/context";

export const modal = React.memo((props) => {
	React.useEffect(() => {console.log("Modal")});

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
}, (prevProps, nextProps) => {
	return prevProps.children.key === nextProps.children.key;
});