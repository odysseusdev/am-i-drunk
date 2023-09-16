import { Drink, Times, User } from "../types";

import { addHours } from "date-fns";
import { create } from "zustand";
import { randomId } from "@mantine/hooks";

interface State {
	times: Times;
	user: User;
	drinks: Drink[];
}

interface Actions {
	/* Times Actions */
	setTimes: (times: Times) => void;
	/* User Actions */
	setUser: (user: User) => void;
	/* Drink Actions */
	editDrink: (drink: Drink) => void;
	removeDrink: (id: string) => void;
}

const useStore = create<State & Actions>()((set) => ({
	times: { origin: addHours(new Date(), -1), now: new Date() },
	user: { sex: "male", weight: 72 },
	drinks: [
		{
			id: randomId(),
			name: "Asahi",
			parts: [{ id: randomId(), quantity: 330, metric: "standards", value: 1.4 }],
			quantity: 2,
		},
		{
			id: randomId(),
			name: "Manhattan",
			parts: [
				{ id: randomId(), quantity: 60, metric: "abv", value: 40 },
				{ id: randomId(), quantity: 30, metric: "abv", value: 15 },
			],
			quantity: 1,
		},
	],
	setTimes: (times: Times) => set((state) => ({ ...state, times })),
	setUser: (user: User) => set((state) => ({ ...state, user })),
	editDrink: (drink: Drink) =>
		set((state) => ({
			...state,
			drinks: [...state.drinks.filter(({ id }) => id !== drink.id), drink],
		})),
	removeDrink: (id: string) => set((state) => ({ ...state, drinks: [...state.drinks.filter((drink) => drink.id !== id)] })),
}));

export default useStore;
