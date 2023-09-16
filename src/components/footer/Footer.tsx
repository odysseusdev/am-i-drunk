import { ActionIcon, Center, Collapse, Container, Grid, Group, Footer as MantineFooter, Overlay, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp, TablerIconsProps } from "@tabler/icons-react";
import { add, format } from "date-fns";

import Chart from "./Chart";
import Item from "./Item";
import Standards from "./Standards";
import { formatSeconds } from "../../lib/util";
import useBAC from "../../lib/hooks/useBAC";
import { useDisclosure } from "@mantine/hooks";

const HEIGHT_NOBAC: number = 48;
const HEIGHT_BAC: number = 76;

const Footer = () => {
	const [opened, { toggle }] = useDisclosure(false);

	const CollapseIcon: (props: TablerIconsProps) => JSX.Element = opened ? IconChevronDown : IconChevronUp;

	const bac = useBAC();

	return (
		<>
			{opened && <Overlay className="blur" style={{ cursor: "pointer" }} onClick={toggle} />}
			<MantineFooter
				height={bac ? (opened ? "fit-content" : HEIGHT_BAC) : HEIGHT_NOBAC}
				zIndex={opened ? 201 : undefined}
			>
				<Container size="xl">
					{bac ? (
						<>
							<Center
								h={HEIGHT_BAC}
								style={{ flexDirection: "column", cursor: "pointer", userSelect: "none" }}
								onClick={toggle}
								py="sm"
							>
								<Text fw={700} variant="gradient" size="xl">
									{bac.bac}% BAC
								</Text>
								<Group position="center" align="center" spacing={4}>
									<Text size="xs" color="dimmed">
										{opened
											? "Click to see less information about your results"
											: "Click to see more information about your results"}
									</Text>
									<ActionIcon className="transition-[color]" variant="subtle">
										<CollapseIcon size={16} stroke={1.5} />
									</ActionIcon>
								</Group>
							</Center>
							<Collapse in={opened} py="md">
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
												bac.timeUntil.sober > 0
													? format(add(bac.times.now, { seconds: bac.timeUntil.sober }), "h:mm")
													: "-"
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
							</Collapse>
						</>
					) : (
						<Center h={HEIGHT_NOBAC}>
							<Text size="sm" color="dimmed">
								Fill out the fields above to estimate your BAC..
							</Text>
						</Center>
					)}
				</Container>
			</MantineFooter>
		</>
	);
};

export default Footer;
