import { computed } from 'nativescript-vue';
import { useColorMode } from '../useColorMode';

export function useDark() {
  const { theme, schema } = useColorMode();

  const isDark = computed<boolean>({
    get() {
      return theme.value === 'dark';
    },
    set(v) {
      const modeVal = v ? 'dark' : 'light';
      schema.value = modeVal;
    },
  });
  return isDark;
}
