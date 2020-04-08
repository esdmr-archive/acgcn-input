import { AxisMap, ButtonMap } from './interface';

export async function initOutput () {
	let ready: () => Promise<void>;
	let buttonMap: ButtonMap;
	let axisMap: AxisMap;

	switch (process.platform) {
		case 'linux':
			const uinput = await import('./uinput'); // Lazy load
			ready = uinput.createDevice;
			buttonMap = uinput.buttonMap;
			axisMap = uinput.axisMap;
			break;

		default:
			throw new Error('No output driver is availiable for ' + process.platform);
	}

	return { ready, buttonMap, axisMap };
}
