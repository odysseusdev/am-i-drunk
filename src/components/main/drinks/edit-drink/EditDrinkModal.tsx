import { Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { Drink, DrinkPart } from "../../../../lib/types";
import { isNotEmpty, useForm } from "@mantine/form";

import PartsInput from "./PartsInput";
import { closeAllModals } from "@mantine/modals";
import { randomId } from "@mantine/hooks";
import useStore from "../../../../lib/stores/store";

interface Props {
	drink?: Drink;
}

export interface FormValues {
	name: string;
	parts: {
		id: string;
		quantity?: number;
		value?: number;
		metric: "abv" | "standards";
	}[];
}

const EditDrinkModal = ({ drink }: Props) => {
	const editDrink = useStore((state) => state.editDrink);

	const form = useForm<FormValues>({
		initialValues: {
			name: drink?.name ?? "",
			parts: drink?.parts ?? [{ id: randomId(), metric: "standards" }],
		},
		validate: {
			name: isNotEmpty(),
			parts: (value) =>
				value.length === 0 ||
				value.some(
					(part) =>
						!part.value ||
						(part.metric === "abv" && (part.value < 1 || part.value > 100)) ||
						(part.metric === "standards" && part.value < 0.1)
				),
		},
	});

	const handleSubmit = async (values: FormValues, event: React.FormEvent) => {
		event.preventDefault();

		if (drink) {
			editDrink({ ...drink, name: values.name, parts: values.parts as DrinkPart[] });
		} else {
			editDrink({ id: randomId(), name: values.name, parts: values.parts as DrinkPart[], quantity: 1 });
		}

		closeAllModals();
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack>
				<TextInput label="Name" placeholder="Enter the drink's name.." withAsterisk {...form.getInputProps("name")} />
				<Text size="xs" color="dimmed">
					The strength of a drink can be calculated by standard drinks or by the percentage of alcohol.
				</Text>
				{form.values.parts.map((part, index) => (
					<PartsInput
						key={part.id}
						part={part}
						index={index}
						form={form}
						error={form.errors.parts as boolean}
						onRemove={(id) => form.setFieldValue("parts", [...form.values.parts.filter((p) => p.id !== id)])}
					/>
				))}
				<Group position="right" mt={-8}>
					<Button
						variant="subtle"
						color="gray"
						size="xs"
						onClick={() => form.setFieldValue("parts", [...form.values.parts, { id: randomId(), metric: "abv" }])}
					>
						Add an additional part
					</Button>
				</Group>
				<Group position="right" spacing="xs">
					<Button variant="default" onClick={() => closeAllModals()}>
						Dismiss
					</Button>
					<Button type="submit" disabled={!form.isValid()}>
						Confirm
					</Button>
				</Group>
			</Stack>
		</form>
	);
};

export default EditDrinkModal;
