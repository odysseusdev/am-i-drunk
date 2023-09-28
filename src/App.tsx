import { AppShell, Container, Divider, Group, MantineProvider, Stack } from "@mantine/core";

import Footer from "./components/footer";
import Forms from "./components/forms";
import Header from "./components/header";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import Results from "./components/results";
import Summary from "./components/Summary";
import theme from "./lib/theme";
import useDesktop from "./lib/hooks/useDesktop";

const App = () => {
	const desktop = useDesktop();

	return (
		<MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
			<ModalsProvider
				labels={{ cancel: "Dismiss", confirm: "Confirm" }}
				modalProps={{
					overlayProps: {
						className: "blur",
					},
					centered: true,
					withCloseButton: false,
				}}
			>
				<Notifications />
				<AppShell header={<Header />} footer={<Footer />}>
					<Container size={desktop ? "lg" : "sm"}>
						<Stack spacing="lg" py={desktop ? "lg" : undefined}>
							<Summary />
							<Divider />
							<Group position="center" align="center" spacing={64} grow>
								<Forms />
								{desktop && <Results />}
							</Group>
						</Stack>
					</Container>
				</AppShell>
			</ModalsProvider>
		</MantineProvider>
	);
};

export default App;
