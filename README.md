# NativeScript-Use

Collection of NativeScript-Use Composition Utilities

[Documentation (Vue3)](https://nativescriptvueuse.netlify.app/)
<br />

This library tries to cover all the `-use` libraries of the frameworks with NativeScript.
Examples:
- [VueUse](https://vueuse.org/)
- [svelte-use](https://svelte-use.vercel.app/)
- [react-use](https://github.com/streamich/react-use)
- [solid-use](https://github.com/lxsmnsyc/solid-use)

## `Use`Packages
- [@vallemar/nativescript-vueuse (Vue3)](packages/nativescript-vueuse/README.md)

As native dependencies, the native code packages have been created in TS so that the core of `NativeScript-Use` is common. Anyone who wants can contribute to create another savor for example: `@nativescript-use/svelte`.
<br />

The following plugins are the core of some of the native functionality already being used in `@nativescript-use/vue`, they have been separated so they can be used for any `@nativescript-use/[any_flavor]` flavor and also, so they can be used as individual plugins. inside nativescript
- [@vallemar/nativescript-clipboard](packages/nativescript-clipboard/README.md)
- [@vallemar/nativescript-keyboard](packages/nativescript-keyboard/README.md)
- [@vallemar/nativescript-orientation](packages/nativescript-orientation/README.md)

# How to contribute?

- clone the repository.
- run: `npm run setup`
- clone app in folder `/apps/` for test and preview in docs: `git clone https://github.com/vallemar/NativeScriptVueUse-demo`
- run app in root folder: `npm run demo:vue:android` or `npm run demo:vue:ios`
- add your changes in `./packages/vue`

Now all the changes that you add will make the application restart and you will be able to add see the effect of your changes

For more information you can enter the [NativeScript discord server](https://discord.com/invite/RgmpGky9GR)!


<h3 align="center">Made with ❤️</h3>
