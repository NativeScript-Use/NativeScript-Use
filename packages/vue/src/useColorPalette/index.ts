import type { Color } from '@nativescript/core';
import { Ref, ref } from 'nativescript-vue';
import { useColorMode } from '../useColorMode';
import { createGlobalState } from '../globalState';

export type PaletteColor<T = string, S = { [key: string]: string | Color }> = { theme: T; colors: S };
export interface UseColorPaletteOptions<T extends string, S extends {} = { [key: string]: string | Color }> {
  /**
   * The initial palettes
   *
   * @default 'auto'
   */
  palettes?: PaletteColor<T, S>[];

  /**
   * A custom handler for handle the updates.
   *
   * @default undefined
   */
  onChanged?: (palette: PaletteColor<T>) => void;
}

const useGlobalState = createGlobalState(<T extends string, S extends {} = {}>(initialPalettes: PaletteColor<T, S>[] | undefined) => {
  const palettes = ref(initialPalettes) as Ref<PaletteColor<T, S>[] | undefined>;

  return { palettes };
});

export function useColorPalette<T extends string, S extends {} = {}>(options: UseColorPaletteOptions<T, S> = {}) {
  const palette = ref<PaletteColor<T, S>>();
  const { palettes } = useGlobalState(options.palettes);

  const { theme } = useColorMode({
    modes: palettes.value?.map((palette) => palette.theme) ?? [],
    onChanged: (theme) => {
      palette.value = findPaletteByTheme<T, S>(palettes.value, theme);
      if (options.onChanged && palette.value) {
        options.onChanged(palette.value);
      }
    },
  });

  palette.value = findPaletteByTheme<T, S>(palettes.value, theme.value);

  return {
    palette,
  };
}

const findPaletteByTheme = <T, S>(palettes: PaletteColor<T, S>[] | undefined, theme: string) => palettes?.find((palette) => palette.theme === theme);
