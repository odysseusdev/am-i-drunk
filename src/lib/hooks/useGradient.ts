import { useMantineTheme } from "@mantine/core";

const useGradient = (color?: string): { from: string; to: string } => {
	const theme = useMantineTheme();

	const selectedColor: string = color ?? theme.primaryColor;

	const colors = Object.keys(theme.colors).slice(2);
	const primaryShade = (theme.primaryShade as { light: number; dark: number })[theme.colorScheme];

	const primaryColorIndex = colors.indexOf(selectedColor);

	return {
		from: theme.colors[selectedColor][primaryShade],
		to: theme.colors[colors[(primaryColorIndex + 1) % colors.length]][primaryShade],
	};
};

export default useGradient;
