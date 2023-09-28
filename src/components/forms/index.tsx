import { Divider, Stack } from "@mantine/core";

import DrinksForm from "./drinks";
import FactorsForm from "./factors";
import TimesForm from "./times";
import UsersForm from "./users";

const Forms = () => {
	return (
		<Stack spacing="lg">
			<UsersForm />
			<FactorsForm />
			<Divider />
			<TimesForm />
			<Divider />
			<DrinksForm />
		</Stack>
	);
};

export default Forms;
