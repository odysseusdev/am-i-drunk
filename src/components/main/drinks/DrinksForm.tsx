import { Button, Text } from "@mantine/core";
import { openConfirmModal, openModal } from "@mantine/modals";

import { Drink } from "../../../lib/types";
import DrinksItem from "./DrinksItem";
import EditDrinkModal from "./edit-drink/EditDrinkModal";
import { IconPlus } from "@tabler/icons-react";
import useStore from "../../../lib/stores/store";

const DrinksForm = () => {
	const [drinks, removeDrink] = useStore((state) => [state.drinks, state.removeDrink]);

	const handleEditDrink = (drink?: Drink) => {
		openModal({
			title: (
				<Text fw={600} size="lg">
					Edit Drink Details
				</Text>
			),
			children: <EditDrinkModal drink={drink} />,
		});
	};

	const handleRemoveDrink = (drink: Drink) => {
		openConfirmModal({
			title: `Remove ${drink.name}`,
			children: <Text>Are you sure you wish to remove {drink.name}?</Text>,
			onConfirm: () => removeDrink(drink.id),
		});
	};

	return (
		<>
			<Text fw={600} transform="uppercase" ta="center" size="sm" variant="gradient">
				3. Drinks Consumed
			</Text>
			<Text px="sm" ta="center" size="xs" color="dimmed">
				A higher quantity of drinks or the consumption of stronger drinks will result in more alcohol for your body to
				process.
			</Text>
			{[...drinks]
				.sort((a, b) => a.name.localeCompare(b.name))
				.map((drink) => (
					<DrinksItem key={drink.id} drink={drink} onEdit={handleEditDrink} onRemove={handleRemoveDrink} />
				))}
			<Button variant="light" leftIcon={<IconPlus stroke={1.5} />} onClick={() => handleEditDrink()}>
				Add drink
			</Button>
		</>
	);
};

export default DrinksForm;
