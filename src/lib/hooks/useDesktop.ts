import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useDesktop = (): boolean => {
	const { breakpoints } = useMantineTheme();

	return useMediaQuery(`(min-width: ${breakpoints.lg}`);
};

export default useDesktop;
