import { Container, Grid, Text } from "@mantine/core";
import { add, format } from "date-fns";

import Chart from "./Chart";
import Item from "./Item";
import Standards from "./Standards";
import { formatSeconds } from "../../lib/util";
import useBAC from "../../lib/hooks/useBAC";

const Results = () => {
	const bac = useBAC();

	if (!bac) {
		return <Text ta="center">Enter all data to see your BAC.</Text>;
	}

	return (
		<Container size="sm">
			<Grid align="center">
				<Grid.Col span={6}>
					<Chart bac={bac.bac} />
				</Grid.Col>
				<Grid.Col span={6}>
					<Standards consumed={bac.standards.consumed} remaining={bac.standards.remaining} />
				</Grid.Col>
				<Grid.Col span={6}>
					<Item
						label="First Drink"
						value={format(bac.times.origin, "h:mm")}
						metric={format(bac.times.origin, "a")}
						description={format(bac.times.origin, "eeee d MMMM yyyy")}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Item
						label="Current Time"
						value={format(bac.times.now, "h:mm")}
						metric={format(bac.times.now, "a")}
						description={format(bac.times.now, "eeee d MMMM yyyy")}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Item
						label="Time Until 0.05%"
						value={
							bac.timeUntil.driving > 0
								? format(add(bac.times.now, { seconds: bac.timeUntil.driving }), "h:mm")
								: "-"
						}
						metric={
							bac.timeUntil.driving > 0
								? format(add(bac.times.now, { seconds: bac.timeUntil.driving }), "a")
								: undefined
						}
						description={formatSeconds(Math.max(0, bac.timeUntil.driving))}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Item
						label="Time Until 0.00%"
						value={
							bac.timeUntil.sober > 0 ? format(add(bac.times.now, { seconds: bac.timeUntil.sober }), "h:mm") : "-"
						}
						metric={
							bac.timeUntil.sober > 0
								? format(add(bac.times.now, { seconds: bac.timeUntil.sober }), "a")
								: undefined
						}
						description={formatSeconds(Math.max(0, bac.timeUntil.sober))}
					/>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default Results;
