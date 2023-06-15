import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptOrientation } from '@demo/shared';
import { } from '@vallemar/nativescript-orientation';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptOrientation {
	
}
