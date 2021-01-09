import React from "react";

export const context = React.createContext({
	onAdd: () => {},
	onRemove: () => {}
});