import { Paper, Text } from "@mantine/core";

interface Props {
	label: string;
	value: string;
	metric?: string;
	description?: string;
}

const Item = ({ label, value, metric, description }: Props) => {
	return (
		<Paper withBorder radius="md" p={12}>
			<Text fw={700} transform="uppercase" size="xs" mb={4}>
				{label}
			</Text>
			<Text fw={600} transform="uppercase" size={30} color="cyan">
				{value}{" "}
				{metric && (
					<Text component="span" size="sm">
						{metric}
					</Text>
				)}
			</Text>
			{description && <Text size="xs">{description}</Text>}
		</Paper>
	);
};

export default Item;
