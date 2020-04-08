export enum Buttons {
	A,
	B,
	X,
	Y,
	Z,
	LT, // Left Trigger
	RT, // Right Trigger
	ST, // Start
}

export enum Axes {
	MX, // Control Stick
	MY,
	CX, // C stick
	CY,
	DX, // Dpad
	DY,
}

export type ButtonMap = {
	readonly [x in Buttons]: (value: 0 | 1) => Promise<void>;
};

export type AxisMap = {
	readonly [x in Axes]: (value: -1 | 0 | 1) => Promise<void>;
};

export enum OutputEventType {
	BTN,
	ABS,
}

export interface OutputEvent<T extends Buttons | Axes = Buttons | Axes> {
	type: T extends Buttons ? OutputEventType.BTN : OutputEventType.ABS,
	key: T,
	value: (T extends Buttons ? never : -1) | 0 | 1,
}

export function checkEventType<T extends Buttons | Axes>
	(event: OutputEvent, type: OutputEvent<T>['type']): event is OutputEvent<T> {
	return event.type === type;
}
