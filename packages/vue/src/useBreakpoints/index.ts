import { Ref, computed } from 'nativescript-vue';
import { useMediaQuery } from '../useMediaQuery';

export type Breakpoints<K extends string = string> = Record<K, number | string>;

/**
 * Reactive screen breakpoints.
 *
 * @param breakpoints
 */
export function useBreakpoints<K extends string>(breakpoints: Breakpoints<K>) {
  function getValue(k: K, d?: number) {
    let v = breakpoints[k];
    return v;
  }

  const greaterOrEqual = (k: K) => {
    return useMediaQuery(`(min-width: ${getValue(k)})`);
  };

  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () => greaterOrEqual(k as K),
      enumerable: true,
      configurable: true,
    });
    return shortcuts;
  }, {} as Record<K, Ref<boolean>>);

  return Object.assign(shortcutMethods, {
    greater(k: K) {
      return useMediaQuery(`(min-width: ${getValue(k, 0.1)})`);
    },
    greaterOrEqual,
    smaller(k: K) {
      return useMediaQuery(`(max-width: ${getValue(k, -0.1)})`);
    },
    smallerOrEqual(k: K) {
      return useMediaQuery(`(max-width: ${getValue(k)})`);
    },
    between(a: K, b: K) {
      return useMediaQuery(`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`);
    },
    isGreater(k: K) {
      return useMediaQuery(`(min-width: ${getValue(k, 0.1)})`);
    },
    isGreaterOrEqual(k: K) {
      return useMediaQuery(`(min-width: ${getValue(k)})`);
    },
    isSmaller(k: K) {
      return useMediaQuery(`(max-width: ${getValue(k, -0.1)})`);
    },
    isSmallerOrEqual(k: K) {
      return useMediaQuery(`(max-width: ${getValue(k)})`);
    },
    isInBetween(a: K, b: K) {
      return useMediaQuery(`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`);
    },
    current() {
      const points = Object.keys(breakpoints).map((i) => [i, greaterOrEqual(i as K)] as const);
      return computed(() => {
        return points.filter(([, v]) => v.value).map(([k]) => k);
      });
    },
  });
}
