import React from "react";

export const context = React.createContext({
	onAdd: () => {},
	onRemove: () => {},
	onClick: () => {},
	price: 0,
	show: false
});