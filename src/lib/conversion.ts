export const MLS_PER_GRAM = 1.2674271229404308;
export const GRAMS_PER_STANDARD = 10;

const toGrams = (mls: number): number => mls / MLS_PER_GRAM;

const toMls = (grams: number): number => grams * MLS_PER_GRAM;

export const toABV = (quantity: number, standards: number): number => {
	if (!quantity || !standards) return 0;
	return toMls(standards * GRAMS_PER_STANDARD) / quantity;
};

export const toStandards = (quantity: number, abv: number): number => {
	if (!quantity || !abv) return 0;
	return toGrams(quantity * (abv / 100)) / GRAMS_PER_STANDARD;
};
