import { Box, Group, Image, Text } from "@mantine/core";

interface Props {
	onClick?: () => void;
}

const Logo = ({ onClick }: Props) => {
	return (
		<Group sx={{ cursor: "pointer", userSelect: "none" }} align="center" spacing="xs" noWrap onClick={onClick}>
			<Image src="/logo.png" alt="Logo" width={36} radius="xl" />
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
