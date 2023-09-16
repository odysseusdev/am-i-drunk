import { AppShell, Container, Divider, MantineProvider, Stack } from "@mantine/core";

import DrinksForm from "./components/main/drinks/DrinksForm";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import Summary from "./components/main/Summary";
import TimesForm from "./components/main/time/TimesForm";
import UserForm from "./components/main/user/UserForm";
import theme from "./lib/theme";

const App = () => {
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
					<Container size="xl" p="xs" mx="auto">
						<Stack spacing="lg">
							<Summary />
							<Divider />
							<UserForm />
							<Divider />
							<TimesForm />
							<Divider />
							<DrinksForm />
						</Stack>
					</Container>
				</AppShell>
			</ModalsProvider>
		</MantineProvider>
	);
};

export default App;
