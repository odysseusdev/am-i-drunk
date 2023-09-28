import { ActionIcon, Center, Collapse, Container, Group, Footer as MantineFooter, Overlay, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp, TablerIconsProps } from "@tabler/icons-react";

import Results from "../results";
import useBAC from "../../lib/hooks/useBAC";
import useDesktop from "../../lib/hooks/useDesktop";
import { useDisclosure } from "@mantine/hooks";

const HEIGHT: number = 76;

const Footer = () => {
	const desktop = useDesktop();

	const [opened, { toggle }] = useDisclosure(false);

	const CollapseIcon: (props: TablerIconsProps) => JSX.Element = opened ? IconChevronDown : IconChevronUp;

	const bac = useBAC();

	if (desktop || !bac) {
		return <></>;
	}

	return (
		<>
			{opened && <Overlay className="blur" style={{ cursor: "pointer" }} onClick={toggle} />}
			<MantineFooter height={opened ? "fit-content" : HEIGHT} zIndex={opened ? 201 : undefined}>
				<Container size="sm">
					<Center
						h={HEIGHT}
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
						<Results />
					</Collapse>
				</Container>
			</MantineFooter>
		</>
	);
};

export default Footer;
