import { Group, NumberInput, Select, Stack, Text, TextInput } from "@mantine/core";

import { titlecase } from "../../../lib/util";
import useStore from "../../../lib/stores/store";

const FactorsForm = () => {
	const [name, setName] = useStore((state) => [state.getUser().name, state.setName]);
	const [factors, setFactors] = useStore((state) => [state.getUser().factors, state.setFactors]);

	return (
		<>
			<Text fw={600} transform="uppercase" ta="center" size="sm" variant="gradient">
				1. About You
			</Text>
			<Text px="sm" ta="center" size="xs" color="dimmed">
				Individual factors such as sex and weight can affect how much alcohol you absorb, and how fast you can eliminate
				it.
			</Text>
			<Stack>
				<TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
				<Group grow>
					<Select
						label="Sex"
						data={["male", "female"].map((value) => ({
							label: `${titlecase(value)}`,
							value,
						}))}
						value={factors.sex}
						onChange={(value: "male" | "female") => setFactors({ ...factors, sex: value })}
					/>
					<NumberInput
						label="Weight"
						min={1}
						value={factors.weight}
						onChange={(value: number | "") => setFactors({ ...factors, weight: value === "" ? undefined : value })}
					/>
				</Group>
			</Stack>
		</>
	);
};

export default FactorsForm;
