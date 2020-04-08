import { Axes, AxisMap, ButtonMap, Buttons, checkEventType, OutputEvent, OutputEventType } from './interface';

interface Driver {
	readonly axisMap: AxisMap;
	readonly buttonMap: ButtonMap;
	readonly ready: () => Promise<void>;
}

export async function initOutput () {
	let driver: Driver;

	switch (process.platform) {
		case 'linux':
			const uinput = await import('./uinput'); // Lazy load
			driver = {
				axisMap: uinput.axisMap,
				buttonMap: uinput.buttonMap,
				ready: uinput.createDevice,
			};
			break;

		default:
			throw new Error('No output driver is availiable for ' + process.platform);
	}

	return driver;
}

function sleep (time: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, time));
}

export const SHORTEST_DELAY = 10;
export const LOGEST_DELAY = 100;

export async function sendEvents (driver: Driver, events: OutputEvent[], delay = 35) {
	await driver.ready();

	for (const event of events) {
		if (checkEventType<Buttons>(event, OutputEventType.BTN)) {
			await driver.buttonMap[event.key](event.value);
		} else if (checkEventType<Axes>(event, OutputEventType.ABS)) {
			await driver.axisMap[event.key](event.value);
		}

		await sleep(delay);
	}
}
