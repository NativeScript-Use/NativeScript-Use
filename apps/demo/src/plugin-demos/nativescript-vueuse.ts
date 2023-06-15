import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptVueuse } from '@demo/shared';
import { } from '@vallemar/nativescript-vueuse';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptVueuse {
	
}
