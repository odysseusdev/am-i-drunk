import { Box, Group, Text, ThemeIcon } from "@mantine/core";

import { IconBeerFilled } from "@tabler/icons-react";

interface Props {
	onClick?: () => void;
}

const Logo = ({ onClick }: Props) => {
	return (
		<Group sx={{ cursor: "pointer", userSelect: "none" }} align="center" spacing="xs" noWrap onClick={onClick}>
			<ThemeIcon size={36} variant="gradient">
				<IconBeerFilled size={24} stroke={1.5} />
			</ThemeIcon>
			<Box>
				<Text fw={600} lh={1.32}>
					Am I Drunk?
				</Text>
				<Text fw={600} lh={1.32} size="xs" color="dimmed">
					BAC Calculator
				</Text>
			</Box>
		</Group>
	);
};

export default Logo;
