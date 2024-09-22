import { ActionIcon, Box, Group, Paper, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { IconMinus, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";

import { Drink } from "../../../lib/types";
import { getStandards } from "../../../lib/drink";
import { pluralize } from "../../../lib/util";
import { useMemo } from "react";
import useStore from "../../../lib/stores/store";

interface Props {
	drink: Drink;
	onEdit: (drink: Drink) => void;
	onRemove: (drink: Drink) => void;
}

const DrinksItem = ({ drink, onEdit, onRemove }: Props) => {
	const theme = useMantineTheme();

	const editDrink = useStore((state) => state.editDrink);

	const standards = useMemo(() => getStandards(drink.parts), [drink.parts]);

	return (
		<Group position="apart" align="center">
			<Box>
				<Text fw={600} lh={1.4}>
					{drink.name}
				</Text>
				<Text size="sm" color="dimmed" lh={1.4}>
					{drink.parts.length === 1 ? `${drink.parts[0].quantity} ml` : pluralize(drink.parts.length, 0, "part")} ·{" "}
					{standards.toFixed(1)} std
				</Text>
			</Box>
			<Group align="center" spacing="sm">
				<Paper
					style={{ display: "flex" }}
					bg={theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]}
				>
					{drink.quantity > 1 && (
						<Tooltip label={`-1 ${drink.name}`} position="bottom-end">
							<ActionIcon
								variant="subtle"
								size="md"
								onClick={() => editDrink({ ...drink, quantity: drink.quantity - 1 })}
							>
								<IconMinus size={20} stroke={1.5} />
							</ActionIcon>
						</Tooltip>
					)}
					<Text style={{ userSelect: "none" }} mx="xs" color="inherit">
						x{drink.quantity}
					</Text>

					<Tooltip label={`+1 ${drink.name}`} position="bottom-end">
						<ActionIcon
							variant="subtle"
							size="md"
							onClick={() => editDrink({ ...drink, quantity: drink.quantity + 1 })}
						>
							<IconPlus size={20} stroke={1.5} />
						</ActionIcon>
					</Tooltip>
				</Paper>
				<Tooltip label="Edit drink" position="bottom-end">
					<ActionIcon variant="light" color="primary" size="md" onClick={() => onEdit(drink)}>
						<IconPencil size={20} stroke={1.5} />
					</ActionIcon>
				</Tooltip>
				<Tooltip label="Delete drink" position="bottom-end">
					<ActionIcon variant="light" color="red" size="md" onClick={() => onRemove(drink)}>
						<IconTrash size={20} stroke={1.5} />
					</ActionIcon>
				</Tooltip>
			</Group>
		</Group>
	);
};

export default DrinksItem;
