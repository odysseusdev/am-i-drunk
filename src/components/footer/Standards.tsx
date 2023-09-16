import { Box, Stack, Text } from "@mantine/core";

interface Props {
	consumed: number;
	remaining: number;
}

const Standards = ({ consumed, remaining }: Props) => {
	return (
		<Stack spacing="lg">
			<Box>
				<Text transform="uppercase" size="xs">
					Standards Consumed
				</Text>
				<Text fw={600} transform="uppercase" style={{ fontSize: 24 }}>
					{consumed.toFixed(1)}{" "}
					<Text component="span" size="xs">
						std
					</Text>
				</Text>
			</Box>
			<Box>
				<Text transform="uppercase" size="xs">
					Standards Remaining
				</Text>
				<Text fw={600} transform="uppercase" style={{ fontSize: 24 }}>
					{remaining.toFixed(1)}{" "}
					<Text component="span" size="sm">
						std
					</Text>
				</Text>
			</Box>
		</Stack>
	);
};

export default Standards;
