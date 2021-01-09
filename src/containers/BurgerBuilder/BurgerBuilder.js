import React from "react";

import { burger as Burger } from "../../components/Burger/Burger";
import { buildControls as BuildControls } from "../../components/Burger/BuildControls/BuildControls";
import { context as Context } from "../../hoc/context";
import { modal as Modal } from "../../components/UI/Modal/Modal";
import { orderSummary as OrderSummary } from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.2,
	bacon: 0.8
};
export class BurgerBuilder extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 0,
			purchasable: false,
			ordering: false
		};

		this.handleAddIngredient = this.handleAddIngredient.bind(this);
		this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
		this.handleToggleOrderModal = this.handleToggleOrderModal.bind(this);
		this.handleOrderContinue = this.handleOrderContinue.bind(this);
	}

	handleOrderContinue() {
		alert("Continue!!!");
	}

	handleToggleOrderModal() {
		this.setState((prevState, _) => ({ordering: !prevState.ordering}));
	}

	handleUpdatePurchase(ingredients) {
		const sum = Object.keys(ingredients).map(
			ingredient => ingredients[ingredient]
		).reduce((sum, price) => sum + price, 0);

		this.setState({purchasable: sum > 0});
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
		this.handleUpdatePurchase(updatedIngredients);
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

		return <Context.Provider
			value={{
				onAdd: this.handleAddIngredient,
				onRemove: this.handleRemoveIngredient,
				onClick: this.handleToggleOrderModal,
				price: this.state.totalPrice,
				show: this.state.ordering
			}}
		>
			<Modal>
				<OrderSummary key={1} ingredients={this.state.ingredients} onClick={this.handleOrderContinue} />
			</Modal>
			<Burger ingredients={this.state.ingredients} />
			<BuildControls
				disableInfo={disableInfo}
				purchasable={this.state.purchasable}
			/>
		</Context.Provider>;
	}
}