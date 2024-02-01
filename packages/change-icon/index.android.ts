import { Utils } from '@nativescript/core';
import PackageManager = android.content.pm.PackageManager;

const startNameActivity = 'MainActivity';

export const changeIcon = {
  reset() {
    changeIcon.change(null);
  },
  getCurrent() {
    const activity = Utils.android.getCurrentActivity();
    if (activity == null) {
      return 'ANDROID:Error';
    }

    const activityName = activity.getComponentName().getClassName();
    if (activityName.endsWith(startNameActivity) || activityName === 'com.tns.NativeScriptActivity') {
      return 'Default';
    }

    const activityNameSplit = activityName.split(startNameActivity);
    if (activityNameSplit.length != 2) {
      return 'ANDROID:UNEXPECTED_COMPONENT_CLASS';
    }

    return activityNameSplit[1];
  },
  change(icon: string | null) {
    const currentIcon = changeIcon.getCurrent();
    if (currentIcon === icon) {
      console.log('ICON_ALREADY_USED');
      return;
    }

    if (currentIcon === 'ANDROID:UNEXPECTED_COMPONENT_CLASS' || currentIcon === 'ANDROID:Error') {
      console.log(currentIcon);
      return;
    }

    let newIcon = icon;
    if (!icon || icon === '' || icon === 'Default') {
      newIcon = 'Default';
    }
    const manager = Utils.android.getCurrentActivity().getPackageManager();
    //Disable
    manager.setComponentEnabledSetting(new android.content.ComponentName(Utils.android.getCurrentActivity(), `${Utils.android.getApplicationContext().getPackageName()}.${startNameActivity}${changeIcon.getCurrent()}`), PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);

    //Enable
    manager.setComponentEnabledSetting(new android.content.ComponentName(Utils.android.getCurrentActivity(), `${Utils.android.getApplicationContext().getPackageName()}.${startNameActivity}${newIcon}`), PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP);
  },
};
