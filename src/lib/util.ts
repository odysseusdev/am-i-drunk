export const pluralize = (
	value: number,
	precision: number,
	noun: string,
	excludeValue: boolean = false,
	suffix: string = "s"
) => (excludeValue ? `${noun}${value !== 1 ? suffix : ""}` : `${value.toFixed(precision)} ${noun}${value !== 1 ? suffix : ""}`);

export const titlecase = (value: string) => value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

export const round = (number: number, precision: number): number =>
	Number(Math.round(Number(number + "e" + precision)) + "e-" + precision);

export const formatSeconds = (seconds: number): string =>
	`${Math.floor((seconds / 3600) % 60).toFixed(0)}hr · ${Math.floor((seconds / 60) % 60).toFixed(0)}min`;
