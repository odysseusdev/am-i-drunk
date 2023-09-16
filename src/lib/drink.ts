import { DrinkPart } from "./types";
import { toStandards } from "./conversion";

export const getStandards = (parts: DrinkPart[]): number =>
	parts.reduce(
		(total, part) => total + (part.metric === "standards" ? part.value : toStandards(part.quantity, part.value)),
		0
	);
