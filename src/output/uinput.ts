/// <reference path="./uinput.d.ts"/>
import * as uinput from 'uinput';
import { Axes, AxisMap, ButtonMap, Buttons } from './interface';

let device: any = null;
const NEG_ONE = 0xFFFFFFFF;

enum OutputButtonMap {
	A = uinput.BTN_A,
	B = uinput.BTN_B,
	X = uinput.BTN_X,
	Y = uinput.BTN_Y,
	Z = uinput.BTN_Z,
	LT = uinput.BTN_TL,
	RT = uinput.BTN_TR,
	ST = uinput.BTN_START,
}

enum OutputAxisMap {
	MX = uinput.ABS_X,
	MY = uinput.ABS_Y,
	CX = uinput.ABS_RX,
	CY = uinput.ABS_RY,
	DX = uinput.ABS_HAT0X,
	DY = uinput.ABS_HAT0Y,
}

const setupConfig = {
	EV_KEY: [
		OutputButtonMap.A, OutputButtonMap.B, OutputButtonMap.X, OutputButtonMap.Y,
		OutputButtonMap.Z, OutputButtonMap.ST, OutputButtonMap.LT, OutputButtonMap.RT,
	],
	EV_ABS: [
		OutputAxisMap.MX, OutputAxisMap.MY, // Main stick
		OutputAxisMap.CX, OutputAxisMap.CY, // C Stick
		OutputAxisMap.DX, OutputAxisMap.DY, // DPad
	],
};

const createConfig = {
	name: 'acgcn-input',
	id: {
		busType: uinput.BUS_VIRTUAL,
		product: 1,
		vendor: 1,
		version: 1,
	},
	absMin: [
		uinput.Abs(OutputAxisMap.MX, NEG_ONE),
		uinput.Abs(OutputAxisMap.MY, NEG_ONE),
		uinput.Abs(OutputAxisMap.CX, NEG_ONE),
		uinput.Abs(OutputAxisMap.CY, NEG_ONE),
		uinput.Abs(OutputAxisMap.DX, NEG_ONE),
		uinput.Abs(OutputAxisMap.DY, NEG_ONE),
	],
	absMax: [
		uinput.Abs(OutputAxisMap.MX, 1),
		uinput.Abs(OutputAxisMap.MY, 1),
		uinput.Abs(OutputAxisMap.CX, 1),
		uinput.Abs(OutputAxisMap.CY, 1),
		uinput.Abs(OutputAxisMap.DX, 1),
		uinput.Abs(OutputAxisMap.DY, 1),
	],
};

function calculateAxisValue (value: -1 | 0 | 1): number {
	return (value < 0 ? NEG_ONE + 1 : 0) + value;
}

export async function createDevice () {
	if (device == null) {
		device = await uinput.setup(setupConfig);
		await device.create(createConfig);
	}
}

export const buttonMap: ButtonMap = {
	async [Buttons.A] (value: 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_KEY, OutputButtonMap.A, value);
	},
	async [Buttons.B] (value: 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_KEY, OutputButtonMap.B, value);
	},
	async [Buttons.X] (value: 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_KEY, OutputButtonMap.X, value);
	},
	async [Buttons.Y] (value: 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_KEY, OutputButtonMap.Y, value);
	},
	async [Buttons.Z] (value: 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_KEY, OutputButtonMap.Z, value);
	},
	async [Buttons.LT] (value: 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_KEY, OutputButtonMap.LT, value);
	},
	async [Buttons.RT] (value: 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_KEY, OutputButtonMap.RT, value);
	},
	async [Buttons.ST] (value: 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_KEY, OutputButtonMap.ST, value);
	},
};

export const axisMap: AxisMap = {
	async [Axes.MX] (value: -1 | 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_ABS, OutputAxisMap.MX, calculateAxisValue(value));
	},
	async [Axes.MY] (value: -1 | 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_ABS, OutputAxisMap.MY, calculateAxisValue(value));
	},
	async [Axes.CX] (value: -1 | 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_ABS, OutputAxisMap.CX, calculateAxisValue(value));
	},
	async [Axes.CY] (value: -1 | 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_ABS, OutputAxisMap.CY, calculateAxisValue(value));
	},
	async [Axes.DX] (value: -1 | 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_ABS, OutputAxisMap.DX, calculateAxisValue(value));
	},
	async [Axes.DY] (value: -1 | 0 | 1) {
		await createDevice();
		device.sendEvent(uinput.EV_ABS, OutputAxisMap.DY, calculateAxisValue(value));
	},
};
