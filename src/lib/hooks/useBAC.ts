import { BACResult } from "../types";
import { calculateBAC } from "../bac";
import { isAfter } from "date-fns";
import useStore from "../stores/store";

const useBAC = (): BACResult | undefined => {
	const [times, user, drinks] = useStore((state) => [state.getUser().times, state.getUser().factors, state.getUser().drinks]);

	if (isAfter(times.origin, times.now) || !user.sex || !user.weight || drinks.length === 0) {
		return;
	}

	return calculateBAC(user.sex, user.weight!, drinks, times.origin, times.now);
};

export default useBAC;
