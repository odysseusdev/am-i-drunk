import { Center, RingProgress, Text } from "@mantine/core";

interface Props {
	bac: number;
}

const Chart = ({ bac }: Props) => {
	return (
		<Center>
			<RingProgress
				size={156}
				thickness={12}
				roundCaps
				sections={[
					{
						value: (Math.min(bac, 0.1) / 0.1) * 100,
						color: bac >= 0.05 ? "red" : bac >= 0.04 ? "orange" : "green",
					},
				]}
				label={
					<>
						<Center>
							<Text fw={700} size="xl" color={bac >= 0.05 ? "red" : bac >= 0.04 ? "orange" : "green"}>
								{bac.toFixed(4)}
							</Text>
						</Center>
						<Center>
							<Text size="xs" color="dimmed">
								% BAC
							</Text>
						</Center>
					</>
				}
			/>
		</Center>
	);
};

export default Chart;
