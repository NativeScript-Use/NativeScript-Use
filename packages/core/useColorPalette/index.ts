import type { Color } from "@nativescript/core"
import { ref, computed } from "nativescript-vue"
import { BasicColorMode, useColorMode } from "../useColorMode";

export type PaletteColor<T = string> = { theme: BasicColorMode | T, colors: { [key: string]: string | Color } }
export interface UseColorPaletteOptions<T extends string = BasicColorMode> {
    /**
     * The initial color mode
     *
     * @default 'auto'
     */
    palettes?: PaletteColor<T>[]

    /**
     * A custom handler for handle the updates.
     * When specified, the default behavior will be overridden.
     *
     * @default undefined
     */
    onChanged?: (palette: PaletteColor<T>) => void
}

export function useColorPalette<T extends string = BasicColorMode>(options: UseColorPaletteOptions<T> = {},) {

    const palette = ref<PaletteColor<T>>();

    const { system, store } = useColorMode({
        modes: options.palettes?.map(palette => palette.theme) ?? [],
        onChanged: (theme) => {                        
            palette.value = options.palettes?.find(palette => palette.theme === theme)
            if (options.onChanged && palette.value) {
                options.onChanged(palette.value);
            }
        }
    });

    const colorMode = computed(() => store.value === 'auto' ? system.value : store.value);
    palette.value = options.palettes?.find(palette => palette.theme === colorMode.value);

    return {
        palette
    }
}