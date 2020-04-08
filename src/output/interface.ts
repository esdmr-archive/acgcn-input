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
