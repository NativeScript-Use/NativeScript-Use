import { Utils } from '@nativescript/core';

export function getSystemTheme() {
  const nightModeFlags = Utils.android.getApplicationContext().getResources().getConfiguration().uiMode & android.content.res.Configuration.UI_MODE_NIGHT_MASK;
  switch (nightModeFlags) {
    case android.content.res.Configuration.UI_MODE_NIGHT_YES:
      return 'dark';
    case android.content.res.Configuration.UI_MODE_NIGHT_NO:
      return 'light';
    default:
      return 'light';
    //case android.content.res.Configuration.UI_MODE_NIGHT_UNDEFINED:
  }
}
