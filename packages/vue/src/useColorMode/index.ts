import { Application, ApplicationSettings, CSSUtils, Frame } from '@nativescript/core';
import { ref, Ref, watch, computed, onUnmounted, getCurrentInstance, readonly } from 'nativescript-vue';
import { getSystemTheme } from './util';
import removeSystemCssClass = CSSUtils.removeSystemCssClass;
import { createGlobalState } from '../globalState';

export type BasicColorMode = 'light' | 'dark';
export type BasicColorSchema = BasicColorMode | 'auto';
export interface UseColorModeOptions<T extends string = BasicColorMode> {
  /**
   * The initial color mode
   *
   * @default 'auto'
   */
  initialValue?: T | BasicColorSchema;

  /**
   * Prefix when adding value to the attribute
   */
  modes?: T[] | BasicColorSchema[];

  /**
   * A custom handler for handle the updates.
   * When specified, the default behavior will be overridden.
   *
   * @default undefined
   */
  onChanged?: (mode: T | BasicColorMode) => void;

  /**
   * Key to persist the data into ApplicationSettings.
   *
   * Pass `null` to disable persistence
   *
   * @default 'nativevueuse-color-scheme'
   */
  storageKey?: string | null;
}

const useGlobalState = createGlobalState(<T extends string = BasicColorMode>(storageKey: string, initialValue: string, themes: string[]) => {
  const system = ref(getSystemTheme());
  const schema = ref(ApplicationSettings.getString(storageKey!, initialValue.toString())) as Ref<T | BasicColorSchema>;
  const modes = ref(themes);
  return { system, schema, modes };
});

export function useColorMode<T extends string = BasicColorMode>(options: UseColorModeOptions<T> = {}) {
  const { initialValue = 'auto', storageKey = 'nativevueuse-color-scheme' } = options;

  const { system, schema, modes } = useGlobalState<T>(storageKey!, initialValue, ['auto', 'light', 'dark', ...(options.modes ?? [])]);

  const theme = computed<T | BasicColorMode>(() => (schema.value === 'auto' ? system.value : schema.value));
  let internalSchema = schema.value;

  Application.on('displayed', () => {
    processTheme();
  });
  Application.on('systemAppearanceChanged', () => {
    processTheme();
  });

  if (getCurrentInstance()) {
    onUnmounted(() => {
      Application.off('displayed', processTheme);
      Application.off('systemAppearanceChanged', processTheme);
    });
  }

  function processTheme() {
    system.value = getSystemTheme();
    if (schema.value === 'auto') {
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
      (Array.from(rootView.cssClasses).join(' ') ?? ' ').split(/\s+/).forEach((v) => v && rootViewClass.add(v));

      modes.value.forEach((theme) => {
        removeSystemCssClass(getClassFromTheme(theme));
        rootViewClass.delete(getClassFromTheme(theme));
      });

      let applyTheme = themeToApply;
      if (themeToApply.toLocaleLowerCase().trim() === 'auto') {
        applyTheme = getSystemTheme();
        Application.setAutoSystemAppearanceChanged(true);
        Application.systemAppearanceChanged(rootView, getSystemTheme()!);
      } else {
        Application.setAutoSystemAppearanceChanged(false);
      }
      const classToApply = getClassFromTheme(applyTheme);
      rootViewClass.add(classToApply);
      CSSUtils.pushToSystemCssClasses(classToApply);
      rootView.className = Array.from(rootViewClass).join(' ');
      const frame = Frame.topmost();
      frame.backStack.forEach((backStack) => backStack.resolvedPage?._onCssStateChange());
      rootView._getRootModalViews()?.forEach((view) => {
        view?._onCssStateChange();
      });
      ApplicationSettings.setString(storageKey!, themeToApply);

      console.log('Apply: ' + classToApply);
    }

    if (rootView && schema.value !== internalSchema) {
      internalSchema = schema.value;
      if (options.onChanged) {
        options.onChanged(theme.value);
      }
    }
  }

  watch(schema, () => {
    applyTheme(schema.value);
  });

  processTheme();

  return {
    schema,
    system: readonly(system),
    theme: readonly(theme),
    modes: readonly(modes),
  };
}

const getClassFromTheme = (theme: string) => CSSUtils.CLASS_PREFIX + theme.toLocaleLowerCase().trim();
