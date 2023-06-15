import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptClipboard } from '@demo/shared';
import { } from '@vallemar/nativescript-clipboard';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptClipboard {
	
}
