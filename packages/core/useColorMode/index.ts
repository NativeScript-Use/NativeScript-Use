import { Application, CSSUtils, Utils, isAndroid, Frame } from "@nativescript/core"
import { ref, Ref, watch, computed, onUnmounted, getCurrentInstance } from "nativescript-vue"
import { useStorage } from "../useStorage"
import { setAutoSystemAppearanceChanged, systemAppearanceChanged } from "@nativescript/core/application"
import removeSystemCssClass = CSSUtils.removeSystemCssClass;

export type BasicColorMode = 'light' | 'dark'
export type BasicColorSchema = BasicColorMode | 'auto'
export interface UseColorModeOptions<T extends string = BasicColorMode> {
    /**
     * The initial color mode
     *
     * @default 'auto'
     */
    initialValue?: T | BasicColorSchema

    /**
     * Prefix when adding value to the attribute
     */
    modes?: T[] | BasicColorSchema[]

    /**
     * A custom handler for handle the updates.
     * When specified, the default behavior will be overridden.
     *
     * @default undefined
     */
    onChanged?: (mode: T | BasicColorMode) => void

    /**
     * Key to persist the data into ApplicationSettings.
     *
     * Pass `null` to disable persistence
     *
     * @default 'nativevueuse-color-scheme'
     */
    storageKey?: string | null
}
/* const system = ref();
const store = ref(); */

export function useColorMode<T extends string = BasicColorMode>(options: UseColorModeOptions<T> = {},) {
    const {
        initialValue = 'auto',
        storageKey = 'nativevueuse-color-scheme'
    } = options

    const storage = useStorage();

    const themes = ["auto", "light", "dark", ...options.modes ?? []];
    const system = ref(getSystemTheme());
    const store = ref(storage.getString(storageKey!, initialValue.toString())) as Ref<T | BasicColorSchema>;
    const state = computed<T | BasicColorMode>(() =>
        store.value === 'auto'
            ? system.value
            : store.value,
    );
    let broadcasting = false

    Application.on('displayed', processTheme);
    Application.on('systemAppearanceChanged', processTheme);
    Application.on('nativevueuse-color-scheme-changed', (data) => {
        if(!broadcasting){
            broadcasting = false;
            system.value = getSystemTheme();
            store.value = (data.object as any)["store"]; 
            if (options.onChanged) {
                options.onChanged(state.value);
            }       
        }
       
    });

    if (getCurrentInstance()) {
        onUnmounted(() => {
            Application.off('displayed', processTheme)
            Application.off('systemAppearanceChanged', processTheme)
            Application.off('nativevueuse-color-scheme-changed', processTheme)
        })
    }

    function processTheme() {
        system.value = getSystemTheme();
        if (store.value === "auto") {
            applyTheme(system.value);
        } else {
            applyTheme(store.value);
        }
    }

    function applyTheme(theme: T | BasicColorSchema) {
        const rootView = Application.getRootView();

        if (rootView && !rootView.className?.includes(getClassFromTheme(theme))) {
            const rootViewClass = new Set<string>();
            (Array.from(rootView.cssClasses).join(" ") ?? " ").split(/\s+/).forEach((v) => v && rootViewClass.add(v));

            themes.forEach(theme => {
                removeSystemCssClass(getClassFromTheme(theme))
                rootViewClass.delete(getClassFromTheme(theme));
            })

            let applyTheme = theme;
            if (theme.toLocaleLowerCase().trim() === "auto") {
                applyTheme = getSystemTheme();
                setAutoSystemAppearanceChanged(true);
                systemAppearanceChanged(rootView, getSystemTheme()!);
            } else {
                setAutoSystemAppearanceChanged(false);
            }
            rootViewClass.add(getClassFromTheme(applyTheme));

            rootView.className = Array.from(rootViewClass).join(" ")
            const frame = Frame.topmost();
            frame.backStack.forEach(backStack => backStack.resolvedPage?._onCssStateChange())
            rootView._getRootModalViews()?.forEach((view) => {
                view?._onCssStateChange();
            });
            storage.setString(storageKey!, theme);

            console.log("Apply: " + getClassFromTheme(theme));
            broadcasting = true;
            Application.notify({
                eventName: 'nativevueuse-color-scheme-changed',
                object: { system: system.value, store: store.value, state: state.value }
            });

            if (options.onChanged) {
                options.onChanged(state.value);
            }
        }
    }

    watch(store, () => {
        applyTheme(store.value)
    })

    processTheme();

    return {
        system,
        store,
        themes
    }
}

const getClassFromTheme = (theme: string) => CSSUtils.CLASS_PREFIX + theme.toLocaleLowerCase().trim()
function getSystemTheme(): BasicColorMode {
    if (isAndroid) {
        const nightModeFlags = Utils.android.getApplicationContext().getResources().getConfiguration().uiMode & android.content.res.Configuration.UI_MODE_NIGHT_MASK;
        switch (nightModeFlags) {
            case android.content.res.Configuration.UI_MODE_NIGHT_YES:
                return "dark"
            case android.content.res.Configuration.UI_MODE_NIGHT_NO:
                return "light"
            default:
                return "light"
            //case android.content.res.Configuration.UI_MODE_NIGHT_UNDEFINED:

        }
    } else {
        return UITraitCollection.currentTraitCollection.userInterfaceStyle === UIUserInterfaceStyle.Light ? "light" : "dark";
    }
}