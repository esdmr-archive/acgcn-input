import * as Keybd from './keybd';
import * as Alpha from './alpha';
export { Keybd, Alpha };

export interface Layout {
	readonly keys: string;
	l: Layout | null;
	y: Layout | null;
	z: Layout | null;
}

// Set triggers for layouts.

function setTriggers (target: Layout, y: Layout, z: Layout, l?: Layout): void {
	target.l = l ?? null;
	target.y = y;
	target.z = z;
}

setTriggers(Alpha.lower, Alpha.punct, Keybd.lower, Alpha.upper);
setTriggers(Alpha.upper, Alpha.punct, Keybd.upper, Alpha.lower);
setTriggers(Alpha.icons, Alpha.lower, Keybd.icons);
setTriggers(Alpha.punct, Alpha.icons, Keybd.punct);
setTriggers(Keybd.lower, Keybd.punct, Alpha.lower, Keybd.upper);
setTriggers(Keybd.upper, Keybd.punct, Alpha.upper, Keybd.lower);
setTriggers(Keybd.icons, Keybd.lower, Alpha.icons);
setTriggers(Keybd.punct, Keybd.icons, Alpha.punct);

export const keybd = [Keybd.lower, Keybd.upper, Keybd.punct, Keybd.icons];
export const alpha = [Alpha.lower, Alpha.upper, Alpha.punct, Alpha.icons];
export const letter = [Keybd.lower, Alpha.lower, Keybd.upper, Alpha.upper];
export const all = [...keybd, ...alpha];
