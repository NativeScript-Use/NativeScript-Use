import { ref, onMounted, readonly } from 'nativescript-vue';
import { unrefView } from '../unrefView';
import { ViewRef } from '../types';
import { Utils, CoreTypes, View } from '@nativescript/core';
import { LOG_PREFIX } from '../constant';

export type ContentSizeDIP = {
  width: CoreTypes.dip;
  fullWidth: CoreTypes.dip;
  height: CoreTypes.dip;
  fullHeight: CoreTypes.dip;
  marginTop: CoreTypes.dip;
  marginBottom: CoreTypes.dip;
  marginLeft: CoreTypes.dip;
  marginRight: CoreTypes.dip;
};

/**
 * Reactive content size of a NativeScript view.
 *
 * @param target
 * @param options
 */
export function useContentElementSize(
  target: ViewRef,
  options?: {
    onChange?: (size: ContentSizeDIP) => void;
    initialSize?: ContentSizeDIP;
  }
) {
  const {
    initialSize = {
      width: 0,
      height: 0,
      fullWidth: 0,
      fullHeight: 0,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    },
  } = options ?? {};

  const width = ref<CoreTypes.dip>(initialSize.width);
  const fullWidth = ref<CoreTypes.dip>(initialSize.width);
  const height = ref<CoreTypes.dip>(initialSize.height);
  const fullHeight = ref<CoreTypes.dip>(initialSize.height);
  const marginTop = ref<CoreTypes.dip>(initialSize.marginTop);
  const marginBottom = ref<CoreTypes.dip>(initialSize.marginBottom);
  const marginLeft = ref<CoreTypes.dip>(initialSize.marginLeft);
  const marginRight = ref<CoreTypes.dip>(initialSize.marginRight);

  function layoutChanged() {
    const parent = unrefView(target);
    if (parent) {
      let computeWidth: CoreTypes.dip = 0;
      let computeHeight: CoreTypes.dip = 0;
      let computeMarginTop: CoreTypes.dip = 0;
      let computeMarginBottom: CoreTypes.dip = 0;
      let computeMarginLeft: CoreTypes.dip = 0;
      let computeMarginRight: CoreTypes.dip = 0;

      parent.eachChildView((child: View) => {
        computeWidth += child.getActualSize().width;
        computeHeight += child.getActualSize().height;
        computeMarginTop += toDeviceIndependent(child.marginTop);
        computeMarginBottom += toDeviceIndependent(child.marginBottom);
        computeMarginLeft += toDeviceIndependent(child.marginLeft);
        computeMarginRight += toDeviceIndependent(child.marginRight);
        return true;
      });

      width.value = computeWidth;
      height.value = computeHeight;
      marginTop.value = computeMarginTop;
      marginBottom.value = computeMarginBottom;
      marginLeft.value = computeMarginLeft;
      marginRight.value = computeMarginRight;
      const computeFullWidth = (fullWidth.value = computeWidth + computeMarginLeft + computeMarginRight);
      const computeFullHeight = (fullHeight.value = computeHeight + computeMarginTop + computeMarginBottom);
      if (options?.onChange) {
        options.onChange({
          width: computeWidth,
          fullWidth: computeFullWidth,
          height: computeHeight,
          fullHeight: computeFullHeight,
          marginTop: computeMarginTop,
          marginBottom: computeMarginBottom,
          marginLeft: computeMarginLeft,
          marginRight: computeMarginRight,
        } as ContentSizeDIP);
      }
    }
  }

  onMounted(() => {
    const view = unrefView(target);
    if (view) {
      view.on('layoutChanged', layoutChanged);
      // So that it is not executed the first time as many times as there are children
      setTimeout(() => {
        view.eachChildView((child: View) => {
          child.on('layoutChanged', layoutChanged);
          return true;
        });
      }, 200);
      view.on('unloaded', () => {
        view.off('layoutChanged', layoutChanged);
        view.eachChildView((child: View) => {
          child.off('layoutChanged', layoutChanged);
          return true;
        });
      });
    }
  });

  return {
    width: readonly(width),
    fullWidth: readonly(fullWidth),
    height: readonly(height),
    fullHeight: readonly(fullHeight),
    marginTop: readonly(marginTop),
    marginBottom: readonly(marginBottom),
    marginLeft: readonly(marginLeft),
    marginRight: readonly(marginRight),
  };
}

function toDeviceIndependent(size: any /* CoreTypes.dip | CoreTypes.LengthDipUnit | CoreTypes.LengthPxUnit */) {
  if (Utils.isNumber(size)) {
    return size;
  } else if (size?.unit) {
    if (size.unit === 'dip') return size;
    else if (size.unit === 'px') return Utils.layout.toDeviceIndependentPixels(size.value);
  }
  console.warn(`${LOG_PREFIX} Impossible to extract the value in DPI`);
  return size;
}
