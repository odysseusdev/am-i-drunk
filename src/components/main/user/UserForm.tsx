import { Group, NumberInput, Select, Text } from "@mantine/core";

import SuperJSON from "superjson";
import { User } from "../../../lib/types";
import { titlecase } from "../../../lib/util";
import { useLocalStorage } from "@mantine/hooks";

const UserForm = () => {
	const [user, setUser] = useLocalStorage<User>({
		key: "user",
		defaultValue: { sex: "male", weight: 72 },
		serialize: SuperJSON.stringify,
		deserialize: SuperJSON.parse,
	});

	return (
		<>
			<Text fw={600} transform="uppercase" ta="center" size="sm" variant="gradient">
				1. About You
			</Text>
			<Text px="sm" ta="center" size="xs" color="dimmed">
				Individual factors such as sex and weight can affect how much alcohol you absorb, and how fast you can eliminate
				it.
			</Text>
			<Group grow>
				<Select
					label="Sex"
					data={["male", "female"].map((value) => ({
						label: `${titlecase(value)}`,
						value,
					}))}
					value={user.sex}
					onChange={(value: "male" | "female") => setUser((user) => ({ ...user, sex: value }))}
				/>
				<NumberInput
					label="Weight"
					min={1}
					value={user.weight}
					onChange={(value: number | "") =>
						setUser((user) => ({ ...user, weight: value === "" ? undefined : value }))
					}
				/>
			</Group>
		</>
	);
};

export default UserForm;
