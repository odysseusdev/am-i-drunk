import { Box, Group, Text, ThemeIcon } from "@mantine/core";

import { IconBeerOff } from "@tabler/icons-react";

const NoResults = () => {
	return (
		<Group position="center" align="center" spacing="sm">
			<ThemeIcon variant="light" size="xl">
				<IconBeerOff stroke={1.5} />
			</ThemeIcon>
			<Box>
				<Text fw={600} size="sm" color="dimmed">
					No drinks found.
				</Text>
				<Text size="xs" color="dimmed">
					Add a drink above to see your BAC.
				</Text>
			</Box>
		</Group>
	);
};

export default NoResults;
