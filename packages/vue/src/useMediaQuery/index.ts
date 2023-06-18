import { onMounted, onUnmounted, ref } from 'nativescript-vue';
import { matchMedia, MediaQueryList, MediaQueryListListener } from '@nativescript-use/nativescript-media-query';

/**
 * Reactive Media Query.
 *
 * @param mediaQueryString
 */
export function useMediaQuery(mediaQueryString: string) {
  const mql = matchMedia(mediaQueryString);
  const matches = ref(mql.matches);

  const onChange: MediaQueryListListener = (event: MediaQueryList) => {
    matches.value = event.matches;
  };

  onMounted(() => {
    mql.addListener(onChange);
  });
  onUnmounted(() => {
    mql.removeListener(onChange);
  });

  return matches;
}
