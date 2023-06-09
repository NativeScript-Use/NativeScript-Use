import { Application, CSSUtils, Utils, isAndroid, Frame } from "@nativescript/core"
import { ref, Ref, watch, computed, onUnmounted, getCurrentInstance, readonly } from "nativescript-vue"
import { useStorage } from "../useStorage"
import { setAutoSystemAppearanceChanged, systemAppearanceChanged } from "@nativescript/core/application"
import removeSystemCssClass = CSSUtils.removeSystemCssClass;
import { createGlobalState } from "../globalState";

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

const useGlobalState = createGlobalState(<T extends string = BasicColorMode>(storageKey: string, initialValue: string, themes: string[]) => {
    const storage = useStorage();
    const system = ref(getSystemTheme())
    const schema = ref(storage.getString(storageKey!, initialValue.toString())) as Ref<T | BasicColorSchema>;
    const modes = ref(themes);
    return { system, schema, modes }
})

export function useColorMode<T extends string = BasicColorMode>(options: UseColorModeOptions<T> = {},) {
    const {
        initialValue = 'auto',
        storageKey = 'nativevueuse-color-scheme'
    } = options

    const storage = useStorage();

    const { system, schema, modes } = useGlobalState<T>(storageKey!, initialValue, ["auto", "light", "dark", ...options.modes ?? []])

    const theme = computed<T | BasicColorMode>(() =>
        schema.value === 'auto'
            ? system.value
            : schema.value,
    );

    Application.on('displayed', () => {
        processTheme();
    });
    Application.on('systemAppearanceChanged', () => {
        processTheme();
    });

    if (getCurrentInstance()) {
        onUnmounted(() => {
            Application.off('displayed', processTheme)
            Application.off('systemAppearanceChanged', processTheme)
        })
    }

    function processTheme() {
        system.value = getSystemTheme();
        if (schema.value === "auto") {
            applyTheme(system.value);
        } else {
            applyTheme(schema.value);
        }
    }

    function applyTheme(themeToApply: T | BasicColorSchema) {
        const rootView = Application.getRootView();
        if (rootView && !rootView.className?.includes(getClassFromTheme(themeToApply))) {
            schema.value = themeToApply;
            const rootViewClass = new Set<string>();
            (Array.from(rootView.cssClasses).join(" ") ?? " ").split(/\s+/).forEach((v) => v && rootViewClass.add(v));

            modes.value.forEach(theme => {
                removeSystemCssClass(getClassFromTheme(theme))
                rootViewClass.delete(getClassFromTheme(theme));
            })

            let applyTheme = themeToApply;
            if (themeToApply.toLocaleLowerCase().trim() === "auto") {
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
            storage.setString(storageKey!, themeToApply);

            console.log("Apply: " + getClassFromTheme(themeToApply));

            if (options.onChanged) {
                options.onChanged(theme.value);
            }
        }
    }

    watch(schema, () => {
        applyTheme(schema.value)
    })

    processTheme();

    return {
        schema,
        system: readonly(system),
        theme: readonly(theme),
        modes: readonly(modes)
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