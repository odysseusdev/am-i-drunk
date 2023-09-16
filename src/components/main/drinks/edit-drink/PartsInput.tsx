import { ActionIcon, Center, Group, NumberInput, Select, Text } from "@mantine/core";
import { IconCornerDownRight, IconTrash } from "@tabler/icons-react";

import { FormValues } from "./EditDrinkModal";
import { UseFormReturnType } from "@mantine/form";

interface Props {
	part: {
		id: string;
		quantity?: number;
		value?: number;
		metric: "abv" | "standards";
	};
	index: number;
	form: UseFormReturnType<FormValues>;
	error?: boolean;
	onRemove: (id: string) => void;
}

const PartsInput = ({ part, index, form, error, onRemove }: Props) => {
	if (index === 0) {
		return (
			<Group align="center" grow>
				<NumberInput
					label="Quantity"
					placeholder={part.metric === "abv" ? "ie. 30" : "ie. 375"}
					rightSection={
						<Text size="xs" color="dimmed">
							ml
						</Text>
					}
					rightSectionWidth={32}
					{...form.getInputProps(`parts.${index}.quantity`)}
					error={error && (!part.quantity || part.quantity < 1)}
				/>
				<NumberInput
					label="Strength"
					placeholder={part.metric === "abv" ? "ie. 38.5" : "ie. 1.4"}
					step={0.1}
					precision={1}
					rightSection={
						<Select
							variant="unstyled"
							size="xs"
							data={[
								{ value: "standards", label: "std" },
								{ value: "abv", label: "%" },
							]}
							{...form.getInputProps(`parts.${index}.metric`)}
						/>
					}
					rightSectionWidth={48}
					{...form.getInputProps(`parts.${index}.value`)}
					error={
						error &&
						(!part.value ||
							(part.metric === "abv" && (part.value < 1 || part.value > 100)) ||
							(part.metric === "standards" && part.value < 0.1))
					}
				/>
			</Group>
		);
	}

	return (
		<Group align="center">
			<Center style={{ width: 28, height: 28 }} mr={-12}>
				<IconCornerDownRight size={18} stroke={1.5} color="grey" />
			</Center>
			<NumberInput
				style={{ flexBasis: 0, flexGrow: 1 }}
				size="xs"
				placeholder={part.metric === "abv" ? "ie. 30" : "ie. 375"}
				rightSection={
					<Text size="xs" color="dimmed">
						ml
					</Text>
				}
				rightSectionWidth={32}
				{...form.getInputProps(`parts.${index}.quantity`)}
				error={error && (!part.quantity || part.quantity < 1)}
			/>
			<NumberInput
				style={{ flexBasis: 0, flexGrow: 1 }}
				size="xs"
				placeholder={part.metric === "abv" ? "ie. 38.5" : "ie. 1.4"}
				step={0.1}
				precision={1}
				rightSection={
					<Select
						variant="unstyled"
						size="xs"
						data={[
							{ value: "standards", label: "std" },
							{ value: "abv", label: "%" },
						]}
						{...form.getInputProps(`parts.${index}.metric`)}
					/>
				}
				rightSectionWidth={48}
				{...form.getInputProps(`parts.${index}.value`)}
				error={
					error &&
					(!part.value ||
						(part.metric === "abv" && (part.value < 1 || part.value > 100)) ||
						(part.metric === "standards" && part.value < 0.1))
				}
			/>
			<Center style={{ width: 28, height: 28 }} ml={-12}>
				<ActionIcon color="red" onClick={() => onRemove(part.id)}>
					<IconTrash size={18} stroke={1.5} />
				</ActionIcon>
			</Center>
		</Group>
	);
};

export default PartsInput;
