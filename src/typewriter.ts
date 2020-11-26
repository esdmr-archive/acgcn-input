import * as Layout from './layout';
import { Axes, Buttons, OutputEvent, OutputEventType } from './output/interface';
type Layout = Layout.Layout;

interface Position {
	x: number;
	y: number;
}

interface CurrentState extends Position {
	layout: Layout;
}

function indexToXY (index: number) {
	return index < 0 ? null : {
		x: index % 10,
		y: index / 10 | 0,
	};
}

function getPositionDifference (posA: Readonly<Position>, posB: Readonly<Position>) {
	return {
		x: posB.x - posA.x,
		y: posB.y - posA.y,
	};
}

function getLetterPosition (letter: string, layout: Layout) {
	return indexToXY(layout.keys.indexOf(letter));
}

function getLayoutSwitchInputs (layout: Layout, currState: CurrentState) {
	const isLayoutLetter = Layout.letter.includes(layout);
	let currLayout = currState.layout;
	const inputs: OutputEvent<Buttons>[] = [];

	if (Layout.keybd.includes(currLayout) !== Layout.keybd.includes(layout)) {
		inputs.push({ type: OutputEventType.BTN, key: Buttons.Z, value: 1 });
		inputs.push({ type: OutputEventType.BTN, key: Buttons.Z, value: 0 });
		currLayout = currLayout.z!;
	}

	while (currLayout !== layout) {
		if (isLayoutLetter && Layout.letter.includes(currLayout)) {
			inputs.push({ type: OutputEventType.BTN, key: Buttons.LT, value: 1 });
			inputs.push({ type: OutputEventType.BTN, key: Buttons.LT, value: 0 });
			currLayout = currLayout.l!;
		} else {
			inputs.push({ type: OutputEventType.BTN, key: Buttons.Y, value: 1 });
			inputs.push({ type: OutputEventType.BTN, key: Buttons.Y, value: 0 });
			currLayout = currLayout.y!;
		}
	}

	return inputs;
}

function selectBestLayout (letter: string, currState: CurrentState) {
	const layoutData = Layout.all.map((layout) => {
		const switchInputs = getLayoutSwitchInputs(layout, currState);
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
		throw new Error(`No layout is possible for letter ${letter}!`);
	}

	const bestLayout = (layoutData[0]!);

	return {
		layout: bestLayout.layout,
		inputs: calculateInput(bestLayout.posDiff, bestLayout.switchInputs),
		posDiff: bestLayout.posDiff,
	};
}

function calculateInput (posDiff: Readonly<Position>, switchInputs: OutputEvent[]) {
	const inputs = [...switchInputs];
	const signX = Math.sign(posDiff.x) as -1 | 0 | 1;
	const absX = Math.abs(posDiff.x);
	const signY = Math.sign(posDiff.y) as -1 | 0 | 1;
	const absY = Math.abs(posDiff.y);

	for (let i = 0; i < absX; i++) {
		inputs.push({ type: OutputEventType.ABS, key: Axes.MX, value: signX });
		inputs.push({ type: OutputEventType.ABS, key: Axes.MX, value: 0 });
	}

	for (let i = 0; i < absY; i++) {
		inputs.push({ type: OutputEventType.ABS, key: Axes.MY, value: signY });
		inputs.push({ type: OutputEventType.ABS, key: Axes.MY, value: 0 });
	}

	inputs.push({ type: OutputEventType.BTN, key: Buttons.A, value: 1 });
	inputs.push({ type: OutputEventType.BTN, key: Buttons.A, value: 0 });
	return inputs;
}

export function generate (code: string, currState?: CurrentState) {
	currState = currState ?? { layout: Layout.Keybd.lower, x: 0, y: 0 };
	const result: OutputEvent[] = [];

	for (const letter of code.split('')) {
		switch (letter) {
			case ' ':
				result.push({ type: OutputEventType.BTN, key: Buttons.RT, value: 1 });
				result.push({ type: OutputEventType.BTN, key: Buttons.RT, value: 0 });
				break;

			default:
				const layoutData = selectBestLayout(letter, currState);
				layoutData.inputs.forEach((input) => result.push(input));
				currState.layout = layoutData.layout;
				currState.x += layoutData.posDiff.x;
				currState.y += layoutData.posDiff.y;
		}
	}

	return result;
}
