/// <reference types="@types/node"/>
import uinput = require('uinput');

interface Layout {
	readonly keys: string;
	l: Layout | null;
	y: Layout | null;
	z: Layout | null;
}

namespace Layout {
	namespace Keys {
		export namespace Keybd {
			export const lower = '!?"-~—\';:\0qwertyuiopasdfghjkl\nzxcvbnm,. ';
			export const upper = '1234567890QWERTYUIOPASDFGHJKL\nZXCVBNM,. ';
		}

		export namespace Alpha {
			export const lower = '!?"-~—\';:.abcdefghijklmnopqrs\ntuvwxyz,. ';
			export const upper = '1234567890ABCDEFJHIJKLMNOPQRS\nTUVWXYZ,. ';
		}

		export const punct = '#?"-~—·;:Æ%&@_?/|×÷=()<>\0\0\0\0+\nßÞð§\0µ¬,. ';
		export const icons =
			'\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\n\0\0\0\0\0\0\0\0\0 ';
	}

	export namespace Keybd {
		export const lower: Layout = { keys: Keys.Keybd.lower, l: null, y: null, z: null };
		export const upper: Layout = { keys: Keys.Keybd.upper, l: null, y: null, z: null };
		export const punct: Layout = { keys: Keys.punct, l: null, y: null, z: null };
		export const icons: Layout = { keys: Keys.icons, l: null, y: null, z: null };
	}

	export namespace Alpha {
		export const lower: Layout = { keys: Keys.Alpha.lower, l: null, y: null, z: null };
		export const upper: Layout = { keys: Keys.Alpha.upper, l: null, y: null, z: null };
		export const punct: Layout = { keys: Keys.punct, l: null, y: null, z: null };
		export const icons: Layout = { keys: Keys.icons, l: null, y: null, z: null };
	}

	// Set triggers for all layouts
	Keybd.icons.y = Keybd.lower;
	Keybd.icons.z = Alpha.icons;
	Keybd.lower.l = Keybd.upper;
	Keybd.lower.y = Keybd.punct;
	Keybd.lower.z = Alpha.lower;
	Keybd.punct.y = Keybd.icons;
	Keybd.punct.z = Alpha.punct;
	Keybd.upper.l = Keybd.lower;
	Keybd.upper.y = Keybd.punct;
	Keybd.upper.z = Alpha.upper;
	Alpha.icons.y = Alpha.lower;
	Alpha.icons.z = Keybd.icons;
	Alpha.lower.l = Alpha.upper;
	Alpha.lower.y = Alpha.punct;
	Alpha.lower.z = Keybd.lower;
	Alpha.punct.y = Alpha.icons;
	Alpha.punct.z = Keybd.punct;
	Alpha.upper.l = Alpha.lower;
	Alpha.upper.y = Alpha.punct;
	Alpha.upper.z = Keybd.upper;

	export const keybd = [Keybd.lower, Keybd.upper, Keybd.punct, Keybd.icons];
	export const alpha = [Alpha.lower, Alpha.upper, Alpha.punct, Alpha.icons];
	export const letter = [Keybd.lower, Alpha.lower, Keybd.upper, Alpha.upper];
	export const all = [...keybd, ...alpha];
}

namespace Output {
	enum OutputKeyMap {
		ba = uinput.BTN_A,
		bb = uinput.BTN_B,
		bx = uinput.BTN_X,
		by = uinput.BTN_Y,
		bz = uinput.BTN_Z,
		bs = uinput.BTN_START,
		lt = uinput.BTN_TL2,
		rt = uinput.BTN_TR2,
		mx = uinput.ABS_HAT0X,
		my = uinput.ABS_HAT0Y,
		cx = uinput.ABS_HAT1X,
		cy = uinput.ABS_HAT1Y,
		dx = uinput.ABS_HAT2X,
		dy = uinput.ABS_HAT2Y,
	}

	const setupConfig = {
		EV_KEY: [
			OutputKeyMap.ba, OutputKeyMap.bb, OutputKeyMap.bx, OutputKeyMap.by,
			OutputKeyMap.bz, OutputKeyMap.bs, OutputKeyMap.lt, OutputKeyMap.rt,
		],
		EV_ABS: [
			OutputKeyMap.mx, OutputKeyMap.my, // Main stick
			OutputKeyMap.cx, OutputKeyMap.cy, // C Stick
			OutputKeyMap.dx, OutputKeyMap.dy, // DPad
		],
	};

	const NEG_ONE = new Uint32Array(new Int32Array([-1]))[0];

	const createConfig = {
		name: 'acgcn-input',
		id: {
			busType: uinput.BUS_VIRTUAL,
			product: 1,
			vendor: 1,
			version: 1,
		},
		absMin: [
			uinput.Abs(OutputKeyMap.mx, NEG_ONE),
			uinput.Abs(OutputKeyMap.my, NEG_ONE),
			uinput.Abs(OutputKeyMap.cx, NEG_ONE),
			uinput.Abs(OutputKeyMap.cy, NEG_ONE),
			uinput.Abs(OutputKeyMap.dx, NEG_ONE),
			uinput.Abs(OutputKeyMap.dy, NEG_ONE),
		],
		absMax: [
			uinput.Abs(OutputKeyMap.mx, 1),
			uinput.Abs(OutputKeyMap.my, 1),
			uinput.Abs(OutputKeyMap.cx, 1),
			uinput.Abs(OutputKeyMap.cy, 1),
			uinput.Abs(OutputKeyMap.dx, 1),
			uinput.Abs(OutputKeyMap.dy, 1),
		],
	};

	export const keys = {
		ba (device: any, value: boolean) {
			console.log((value ? 'kdn' : 'kup') + ': a');
			device.sendEvent(uinput.EV_KEY, OutputKeyMap.ba, +value);
		},
		bb (device: any, value: boolean) {
			console.log((value ? 'kdn' : 'kup') + ': b');
			device.sendEvent(uinput.EV_KEY, OutputKeyMap.bb, +value);
		},
		bx (device: any, value: boolean) {
			console.log((value ? 'kdn' : 'kup') + ': x');
			device.sendEvent(uinput.EV_KEY, OutputKeyMap.bx, +value);
		},
		by (device: any, value: boolean) {
			console.log((value ? 'kdn' : 'kup') + ': y');
			device.sendEvent(uinput.EV_KEY, OutputKeyMap.by, +value);
		},
		bz (device: any, value: boolean) {
			console.log((value ? 'kdn' : 'kup') + ': z');
			device.sendEvent(uinput.EV_KEY, OutputKeyMap.bz, +value);
		},
		bs (device: any, value: boolean) {
			console.log((value ? 'kdn' : 'kup') + ': s');
			device.sendEvent(uinput.EV_KEY, OutputKeyMap.bs, +value);
		},
		lt (device: any, value: boolean) {
			console.log((value ? 'tdn' : 'tup') + ': l');
			device.sendEvent(uinput.EV_KEY, OutputKeyMap.lt, +value);
		},
		rt (device: any, value: boolean) {
			console.log((value ? 'tdn' : 'tup') + ': r');
			device.sendEvent(uinput.EV_KEY, OutputKeyMap.rt, +value);
		},
		mu (device: any, value: boolean) {
			if (!value) {
				return keys.mc(device);
			}
			console.log('ctr: u');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.mx, 0);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.my, NEG_ONE);
		},
		md (device: any, value: boolean) {
			if (!value) {
				return keys.mc(device);
			}
			console.log('ctr: d');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.mx, 0);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.my, 1);
		},
		ml (device: any, value: boolean) {
			if (!value) {
				return keys.mc(device);
			}
			console.log('ctr: l');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.mx, NEG_ONE);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.my, 0);
		},
		mr (device: any, value: boolean) {
			if (!value) {
				return keys.mc(device);
			}
			console.log('ctr: r');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.mx, 1);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.my, 0);
		},
		mc (device: any) {
			console.log('ctr: c');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.mx, 0);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.my, 0);
		},
		cu (device: any, value: boolean) {
			if (!value) {
				return keys.cc(device);
			}
			console.log('cst: u');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.cx, 0);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.cy, NEG_ONE);
		},
		cd (device: any, value: boolean) {
			if (!value) {
				return keys.cc(device);
			}
			console.log('cst: d');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.cx, 0);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.cy, 1);
		},
		cl (device: any, value: boolean) {
			if (!value) {
				return keys.cc(device);
			}
			console.log('cst: l');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.cx, NEG_ONE);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.cy, 0);
		},
		cr (device: any, value: boolean) {
			if (!value) {
				return keys.cc(device);
			}
			console.log('cst: r');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.cx, 1);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.cy, 0);
		},
		cc (device: any) {
			console.log('cst: c');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.cx, 0);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.cy, 0);
		},
		du (device: any, value: boolean) {
			if (!value) {
				return keys.dc(device);
			}
			console.log('hat: u');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.dx, 0);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.dy, NEG_ONE);
		},
		dd (device: any, value: boolean) {
			if (!value) {
				return keys.dc(device);
			}
			console.log('hat: d');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.dx, 0);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.dy, 1);
		},
		dl (device: any, value: boolean) {
			if (!value) {
				return keys.dc(device);
			}
			console.log('hat: l');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.dx, NEG_ONE);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.dy, 0);
		},
		dr (device: any, value: boolean) {
			if (!value) {
				return keys.dc(device);
			}
			console.log('hat: r');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.dx, 1);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.dy, 0);
		},
		dc (device: any) {
			console.log('hat: c');
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.dx, 0);
			device.sendEvent(uinput.EV_ABS, OutputKeyMap.dy, 0);
		},
	};

	let device: any = null;

	export async function createDevice () {
		if (device == null) {
			device = await uinput.setup(setupConfig);
			await device.create(createConfig);
		}

		return device;
	}
}

namespace Generator {
	const currState = { layout: Layout.Keybd.lower, x: 0, y: 0 };

	interface Position {
		readonly x: number;
		readonly y: number;
	}

	interface LayoutData {
		readonly cost: number;
		readonly switchInputs: string[];
		readonly posDiff: Position;
		readonly layout: Layout;
	}

	function indexToXY (index: number) {
		return index < 0 ? null : {
			x: index % 10,
			y: index / 10 | 0,
		};
	}

	function getPositionDifference (posA: Position, posB: Position) {
		return {
			x: posB.x - posA.x,
			y: posB.y - posA.y,
		};
	}

	function getLetterPosition (letter: string, layout: Layout) {
		return indexToXY(layout.keys.indexOf(letter));
	}

	function getLayoutSwitchInputs (layout: Layout): string[] {
		const isLayoutLetter = Layout.letter.includes(layout);
		let currLayout = currState.layout;
		const inputs = [];

		if (Layout.keybd.includes(currLayout) !== Layout.keybd.includes(layout)) {
			inputs.push('bz');
			currLayout = currLayout.z!;
		}

		while (currLayout !== layout) {
			if (isLayoutLetter && Layout.letter.includes(currLayout)) {
				inputs.push('lt');
				currLayout = currLayout.l!;
			} else {
				inputs.push('by');
				currLayout = currLayout.y!;
			}
		}

		return inputs;
	}

	function selectBestLayout (letter: string): LayoutData {
		const layoutData = Layout.all.map((layout) => {
			const switchInputs = getLayoutSwitchInputs(layout);
			const letterPos = getLetterPosition(letter, layout);

			if (letterPos == null) {
				return null;
			} else {
				const posDiff = getPositionDifference(currState, letterPos);
				const cost = switchInputs.length + Math.abs(posDiff.x) + Math.abs(posDiff.y);
				return { cost, switchInputs, posDiff, layout };
			}
		}).filter((data) => data != null).sort((a, b) => a!.cost - b!.cost);

		if (layoutData.length === 0) {
			throw new TypeError('No layout is possible!');
		}

		return layoutData[0]!;
	}

	function calculateInput (layoutData: LayoutData): string[] {
		const xMove = layoutData.posDiff.x < 0 ? Array(-layoutData.posDiff.x).fill('ml')
			: Array(layoutData.posDiff.x).fill('mr');
		const yMove = layoutData.posDiff.y < 0 ? Array(-layoutData.posDiff.y).fill('mu')
			: Array(layoutData.posDiff.y).fill('md');
		const inputs = [...layoutData.switchInputs, ...xMove, ...yMove, 'ba'];
		return inputs;
	}

	export function generate (code: string) {
		currState.layout = Layout.Keybd.lower;
		currState.x = 0;
		currState.y = 0;
		const result = [];

		for (const i of code.split('')) {
			if (i === ' ') {
				result.push('rt');
			} else {
				const layoutData = selectBestLayout(i);
				calculateInput(layoutData).forEach((input) => result.push(input));
				currState.layout = layoutData.layout;
				currState.x += layoutData.posDiff.x;
				currState.y += layoutData.posDiff.y;
			}
		}

		return result;
	}
}

// console.log(Generator.generate('#asZI&NIrqKpK#vfBeIDWIrsPkul'));

function sleep (time: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, time));
}

const SHORTEST_DELAY = 35;
async function main () {
	console.log('Setting up input');
	const device = await Output.createDevice();

	console.log('Waiting 5 sec...');
	await sleep(5000);
	// await testOutput(device);
	// const generated = Generator.generate('WB28pARAcnownUjMCK%hTk8JHyrT');
	const generated = Generator.generate('Hi Tangy!\nHow are you doing?\n Please accept this gift.\n ~esdmr');
	for (const key of generated) {
		Output.keys[key](device, true);
		await sleep(SHORTEST_DELAY);
		Output.keys[key](device, false);
		await sleep(SHORTEST_DELAY);
	}

	console.log('Done');
	await sleep(2000000);
}

main().catch(console.error);
