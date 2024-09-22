import { Drink, Factors, Times, User } from "../types";

import { addHours } from "date-fns";
import { create } from "zustand";
import { randomId } from "@mantine/hooks";

interface State {
	users: User[];
	selectedUserId: string;
}

interface Selectors {
	getUser: () => User;
}

interface Actions {
	editUser: (user: User) => void;
	deleteUser: () => void;
	setSelectedUserId: (id: string) => void;
	setName: (name: string) => void;
	setFactors: (factors: Factors) => void;
	setTimes: (times: Times) => void;
	editDrink: (drink: Drink) => void;
	removeDrink: (id: string) => void;
}

const initialId: string = randomId();

const useStore = create<State & Selectors & Actions>()((set, get) => ({
	/* State */
	users: [
		{
			id: initialId,
			created: new Date(),
			name: "Drinker #1",
			factors: { sex: "male", weight: 74 },
			times: { origin: addHours(new Date(), -1), now: new Date() },
			drinks: [],
		},
	],
	selectedUserId: initialId,

	/* Selectors */
	getUser: () => {
		const user = get().users.find(({ id }) => id === get().selectedUserId);

		if (!user) get().setSelectedUserId(get().users[0].id);

		return get().users.find(({ id }) => id === get().selectedUserId) ?? get().users[0];
	},

	/* Actions */
	editUser: (user: User) => set((state) => ({ ...state, users: [...state.users.filter(({ id }) => id !== user.id), user] })),
	deleteUser: () => set((state) => ({ ...state, users: [...state.users.filter(({ id }) => id !== state.selectedUserId)] })),
	setSelectedUserId: (id: string) => set((state) => ({ ...state, selectedUserId: id })),
	setName: (name: string) =>
		set((state) => {
			const user = state.users.find(({ id }) => id === state.selectedUserId);

			if (!user) return state;

			return {
				...state,
				users: [...state.users.filter(({ id }) => id !== state.selectedUserId), { ...user, name }],
			};
		}),
	setFactors: (factors: Factors) =>
		set((state) => {
			const user = state.users.find(({ id }) => id === state.selectedUserId);

			if (!user) return state;

			return {
				...state,
				users: [...state.users.filter(({ id }) => id !== state.selectedUserId), { ...user, factors }],
			};
		}),
	setTimes: (times: Times) =>
		set((state) => {
			const user = state.users.find(({ id }) => id === state.selectedUserId);

			if (!user) return state;

			return {
				...state,
				users: [...state.users.filter(({ id }) => id !== state.selectedUserId), { ...user, times }],
			};
		}),
	editDrink: (drink: Drink) =>
		set((state) => {
			const user = state.users.find(({ id }) => id === state.selectedUserId);

			if (!user) return state;

			return {
				...state,
				users: [
					...state.users.filter(({ id }) => id !== state.selectedUserId),
					{ ...user, drinks: [...user.drinks.filter(({ id }) => id !== drink.id), drink] },
				],
			};
		}),
	removeDrink: (id: string) =>
		set((state) => {
			const user = state.users.find(({ id }) => id === state.selectedUserId);

			if (!user) return state;

			return {
				...state,
				users: [
					...state.users.filter(({ id }) => id !== state.selectedUserId),
					{ ...user, drinks: [...user.drinks.filter((drink) => drink.id !== id)] },
				],
			};
		}),
}));

export default useStore;
