import { Box, Group, Text, ThemeIcon } from "@mantine/core";

import { IconBeerOff } from "@tabler/icons-react";

const NoResults = () => {
	return (
		<Group position="center" align="center" spacing="sm">
			<ThemeIcon variant="light" size="xl" color="gray">
				<IconBeerOff stroke={1.5} />
			</ThemeIcon>
			<Box>
				<Text fw={600} lh={1.48} size="sm" color="dimmed">
					No drinks found.
				</Text>
				<Text lh={1.32} size="xs" color="dimmed">
					Add a drink to see your BAC.
				</Text>
			</Box>
		</Group>
	);
};

export default NoResults;
