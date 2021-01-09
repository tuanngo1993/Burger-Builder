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
			totalPrice: 0
		};

		this.handleAddIngredient = this.handleAddIngredient.bind(this);
		this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
	}

	handleIngredient(type, action) {
		const oldCount = this.state.ingredients[type];
		let updatedCount;
		if(action === "add") {
			updatedCount = oldCount + 1;
		} else if (action === "remove") {
			if (oldCount <= 0) return;
			updatedCount = oldCount - 1;
		}
		const updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type] = updatedCount;

		const priceIngredient = INGREDIENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		let updatedPrice;
		if(action === "add") {
			updatedPrice = oldPrice + priceIngredient;
		} else if (action === "remove") {
			updatedPrice = oldPrice - priceIngredient;
		}

		this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
	}

	handleAddIngredient(type) {
		this.handleIngredient(type, "add");
	}

	handleRemoveIngredient(type) {
		this.handleIngredient(type, "remove");
	}

	render() {
		const disableInfo = {...this.state.ingredients};

		for(let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}

		return <Aux>
			<Burger ingredients={this.state.ingredients} />
			<Context.Provider value={{ onAdd: this.handleAddIngredient, onRemove: this.handleRemoveIngredient }}>
				<BuildControls disableInfo={disableInfo} price={this.state.totalPrice} />
			</Context.Provider>
		</Aux>;
	}
}