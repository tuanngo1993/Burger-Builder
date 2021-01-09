import React from "react";

import {aux as Aux} from "../../hoc/Aux";
import { burger as Burger } from "../../components/Burger/Burger";
import { buildControls as BuildControls } from "../../components/Burger/BuildControls/BuildControls";

export class BurgerBulder extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			}
		};
	}

	render() {
		return <Aux>
			<Burger ingredients={this.state.ingredients} />
			<BuildControls />
		</Aux>;
	}
}