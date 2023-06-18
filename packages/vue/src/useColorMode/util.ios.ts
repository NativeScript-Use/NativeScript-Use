export function getSystemTheme() {
  return UITraitCollection.currentTraitCollection.userInterfaceStyle === UIUserInterfaceStyle.Light ? 'light' : 'dark';
}
