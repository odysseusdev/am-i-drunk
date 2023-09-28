import { Drink, Factors, Times } from ".";

export interface User {
	id: string;
	created: Date;
	name: string;
	times: Times;
	factors: Factors;
	drinks: Drink[];
}
