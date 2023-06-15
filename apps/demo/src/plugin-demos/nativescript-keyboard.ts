import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptKeyboard } from '@demo/shared';
import { } from '@vallemar/nativescript-keyboard';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptKeyboard {
	
}
