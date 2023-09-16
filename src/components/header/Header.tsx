import { ActionIcon, Container, Group, Header as MantineHeader } from "@mantine/core";
import { IconInfoCircle, IconSettings } from "@tabler/icons-react";

import Logo from "./Logo";

const HEIGHT: number = 64;

const Header = () => {
	return (
		<MantineHeader height={HEIGHT}>
			<Container size="xs">
				<Group h={HEIGHT} position="apart" align="center">
					<Logo />
					<Group display="none">
						<ActionIcon>
							<IconInfoCircle size={24} stroke={1.5} />
						</ActionIcon>
						<ActionIcon>
							<IconSettings size={24} stroke={1.5} />
						</ActionIcon>
					</Group>
				</Group>
			</Container>
		</MantineHeader>
	);
};

export default Header;
