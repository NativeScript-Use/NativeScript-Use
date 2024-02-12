export const changeIcon = {
  reset() {
    changeIcon.change(null);
  },
  getCurrent() {
    return UIApplication.sharedApplication.alternateIconName ?? 'Default';
  },
  change(icon: string | null) {
    if (changeIcon.getCurrent() === icon) {
      console.log('ICON_ALREADY_USED');
      return;
    }

    let newIcon: string | null = icon;
    if (!icon || icon === '' || icon === 'Default') {
      newIcon = null;
    }

    UIApplication.sharedApplication.setAlternateIconNameCompletionHandler(newIcon, null);
  },
};
