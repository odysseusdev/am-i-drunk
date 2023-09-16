import { DateTimePicker, DateValue } from "@mantine/dates";
import { Group, Text } from "@mantine/core";
import { isSameDay, isToday, isTomorrow, isYesterday } from "date-fns";

import useStore from "../../../lib/stores/store";

const TimesForm = () => {
	const [times, setTimes] = useStore((state) => [state.times, state.setTimes]);

	const { origin, now } = times;

	const valueFormat = (date: Date) => {
		if (isSameDay(origin, now)) return "h:mm a";

		if (isYesterday(date)) return "[Yesterday] h:mm a";

		if (isToday(date)) return "[Today] h:mm a";

		if (isTomorrow(date)) return "[Tomorrow] h:mm a";

		return "D/M/YY h:mm a";
	};

	return (
		<>
			<Text fw={600} transform="uppercase" ta="center" size="sm" variant="gradient">
				2. Current Session
			</Text>
			<Text px="sm" ta="center" size="xs" color="dimmed">
				Drinks consumed over a shorter period of time result in less time for your body to process the alcohol.
			</Text>
			<Group grow>
				<DateTimePicker
					label="From"
					value={origin}
					valueFormat={valueFormat(origin)}
					onChange={(value: DateValue) => setTimes({ ...times, origin: value as Date })}
				/>
				<DateTimePicker
					label="To"
					value={now}
					valueFormat={valueFormat(now)}
					onChange={(value: DateValue) => setTimes({ ...times, now: value as Date })}
				/>
			</Group>
		</>
	);
};

export default TimesForm;
