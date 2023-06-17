import { Utils } from '@nativescript/core';
import { ClipboardBase } from './common';

export class Clipboard extends ClipboardBase {
  protected clipboard: android.content.ClipboardManager;

  constructor() {
    super();
    this.clipboard = Utils.android.getApplicationContext().getSystemService(android.content.Context.CLIPBOARD_SERVICE);
  }

  onCopy(callback: (text: string) => void): void {
    this.offCopy();
    let THRESHOLD_MS = 50;
    let enableCallback = true;
    this.listener = new android.content.ClipboardManager.OnPrimaryClipChangedListener({
      onPrimaryClipChanged: () => {
        if (enableCallback) callback(this.clipboard.getPrimaryClip()?.getItemAt(0)?.getText()?.toString());
        enableCallback = false;
        setTimeout(() => {
          enableCallback = true;
        }, THRESHOLD_MS);
      },
    });
    this.clipboard.addPrimaryClipChangedListener(this.listener);
  }

  offCopy(): void {
    if (this.listener) this.clipboard.removePrimaryClipChangedListener(this.listener);
  }

  copy(text: string): boolean {
    const clip = android.content.ClipData.newPlainText('App clipboard data', text);
    this.clipboard.setPrimaryClip(clip);
    return true;
  }

  read(): string {
    const item = this.clipboard.getPrimaryClip()?.getItemAt(0);
    let content = item?.getText().toString();
    return content || '';
  }
}
