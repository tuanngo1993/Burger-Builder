import React from "react";

import {aux as Aux} from "../../hoc/Aux";
import { burger as Burger } from "../../components/Burger/Burger";
import { buildControls as BuildControls } from "../../components/Burger/BuildControls/BuildControls";
import { context as Context } from "../../hoc/context";

const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.2,
	bacon: 0.8
};
export class BurgerBulder extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 4
		};

		this.handleAddIngredient = this.handleAddIngredient.bind(this);
	}

	handleAddIngredient(type) {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		const updatedPrice = oldPrice + priceAddition;

		this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
	}

	render() {
		return <Aux>
			<Burger ingredients={this.state.ingredients} />
			<Context.Provider value={{onAdd: this.handleAddIngredient}}>
				<BuildControls />
			</Context.Provider>
		</Aux>;
	}
}