import { generate } from './typewriter';
import { initOutput, sendEvents } from './output';
import { Buttons } from './output/interface';
import { sleep } from './timer';

async function main () {
	const driver = await initOutput();
	console.log('Creating output device...');
	await driver.ready();
	console.log('Waiting 5sec...');
	await sleep(5000);
	console.log('Sending Events...');
	const generated = generate('Hi!\nHow are you doing?\nPlease accept this gift.\n~player');
	await sendEvents(driver, generated);
	console.log('Done.');
	await sleep(60000);
}

main().catch(console.error);
