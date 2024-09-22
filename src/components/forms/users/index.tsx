import { ActionIcon, Group, Tabs, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { addHours, compareAsc } from "date-fns";

import { randomId } from "@mantine/hooks";
import useStore from "../../../lib/stores/store";

const UsersForm = () => {
	const { colors, primaryColor } = useMantineTheme();

	const [users, editUser, deleteUser] = useStore((state) => [state.users, state.editUser, state.deleteUser]);
	const [selectedUserId, setSelectedUserId] = useStore((state) => [state.selectedUserId, state.setSelectedUserId]);

	const addUser = () => {
		const id: string = randomId();

		editUser({
			id,
			created: new Date(),
			name: `Drinker #${users.length + 1}`,
			factors: { sex: "male", weight: 74 },
			times: { origin: addHours(new Date(), -1), now: new Date() },
			drinks: [],
		});

		setSelectedUserId(id);
	};

	return (
		<Tabs
			variant="pills"
			radius="xl"
			pos="sticky"
			bg="white"
			style={{ zIndex: 1 }}
			py="1rem"
			mt="-1rem"
			mb="-0.5rem"
			top="calc(var(--mantine-header-height, 0px))"
			value={selectedUserId}
			onTabChange={(value) => setSelectedUserId(value as string)}
		>
			<Tabs.List>
				{[...users]
					.sort((a, b) => compareAsc(a.created, b.created))
					.map((user) => (
						<Tabs.Tab
							key={user.id}
							h={30}
							px="sm"
							value={user.id}
							style={{ border: selectedUserId === user.id ? undefined : `solid 1px ${colors.gray[4]}` }}
						>
							<Group spacing={8} align="center">
								<Text size="sm" color={selectedUserId === user.id ? undefined : "dimmed"}>
									{user.name}
								</Text>
								{user.id === selectedUserId && users.length > 1 && (
									<ActionIcon
										variant="filled"
										radius="xl"
										size={22}
										color={primaryColor}
										mr={-4}
										onClick={deleteUser}
									>
										<IconTrash size={14} stroke={1.5} />
									</ActionIcon>
								)}
							</Group>
						</Tabs.Tab>
					))}
				<Tooltip label="Add drinker" position="bottom-end">
					<ActionIcon variant="light" radius="xl" size={30} onClick={addUser}>
						<IconPlus size={24} stroke={1.5} />
					</ActionIcon>
				</Tooltip>
			</Tabs.List>
		</Tabs>
	);
};

export default UsersForm;
