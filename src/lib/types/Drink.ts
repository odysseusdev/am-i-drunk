export interface Drink {
	id: string;
	name: string;
	parts: Array<DrinkPart>;
	quantity: number;
}

export interface DrinkPart {
	id: string;
	quantity: number;
	metric: "abv" | "standards";
	value: number;
}
