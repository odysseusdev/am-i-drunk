/*
 * Sex = how much alcohol is absorbed
 * Age = how fast alcohol is eliminated
 * Height = how much alcohol is absorbed
 * Weight = how much alcohol is absorbed
 *
 * BAC = A ( 1 - e^(-kt) )
 *       -----------------  - ( B * t )
 *              rW
 *
 * BAC =    A
 *       ------- - ( B * t )
 *        r * W
 *
 * r = ratio of body water to total weight. It varies between individuals but averages about 0.68 for men and 0.55 for women, since women tend to have a higher percentage of fat.
 */

import { Drink } from "./types";
import { GRAMS_PER_STANDARD } from "./conversion";
import { differenceInSeconds } from "date-fns";
import { getStandards } from "./drink";
import { round } from "./util";

export interface BACResult {
	bac: number;
	standards: {
		consumed: number;
		remaining: number;
	};
	times: {
		origin: Date;
		now: Date;
	};
	timeUntil: {
		driving: number;
		sober: number;
	};
}

const R = {
	male: 0.68,
	female: 0.55,
};

const B = 0.017;

export const calculateBAC = (sex: "male" | "female", weight: number, drinks: Drink[], origin: Date, now: Date): BACResult => {
	const standards = drinks.reduce((total, drink) => total + getStandards(drink.parts) * drink.quantity, 0);
	const hours = differenceInSeconds(now, origin) / 3600;

	const A: number = standards * GRAMS_PER_STANDARD;

	const bac = (A * 100) / (R[sex] * weight * 1000) - B * hours * 1.055;

	return {
		bac: Math.max(0, round(bac, 4)),
		standards: { consumed: standards, remaining: (bac * R[sex] * weight * 1000) / 100 / GRAMS_PER_STANDARD },
		times: {
			origin,
			now,
		},
		timeUntil: {
			driving: ((bac - 0.05) / B) * 3600,
			sober: (bac / B) * 3600,
		},
	};
};

// export const calculateBAC2 = (
// 	sex: "male" | "female",
// 	age: number,
// 	height: number,
// 	weight: number,
// 	fullStomach: boolean,
// 	drinks: any[],
// 	date: Date = new Date()
// ): BACResult => {};
