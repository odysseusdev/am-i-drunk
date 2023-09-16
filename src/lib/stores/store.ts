import { Drink, Times, User } from "../types";

import { addHours } from "date-fns";
import { create } from "zustand";

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
	user: { sex: "male", weight: 74 },
	drinks: [],
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
