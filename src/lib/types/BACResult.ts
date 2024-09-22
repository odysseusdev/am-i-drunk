export interface BACResult {
	bac: number;
	standards: {
		consumed: number;
		remaining: number;
	};
	times: {
		origin: Date;
		now: Date;
	};
	timeUntil: {
		driving: number;
		sober: number;
	};
}
