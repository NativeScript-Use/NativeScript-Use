<script setup>
import Source from '../../.vitepress/theme/components/Source.vue'
</script>

# useEventListener

Use EventListener with ease. Register using view.on on mounted, and view.off automatically on unmounted.

## Usage

```vue
<script lang="ts" setup>
import { ref } from 'nativescript-vue'
import { useEventListener } from '@nativescript-use/vue'
import { StackLayout } from "@nativescript/core";

const el = ref();

const { cleanup } = useEventListener<StackLayout>(el, {
  loaded: (eventData) => {
    const view = eventData.object; // .object is StackLayout
  },
  tap: (eventData) => {
    // some logic
  }
  // ... see all listeners on Type declaration section
})

cleanup() // off all events

</script>

<template>
  <StackLayout ref="el">
  </StackLayout>
</template>
```

## Source
<Source source="useEventListener" demo="EventListenerView.vue"/>

## Type declaration
```ts
import { ViewRef } from "@nativescript-use/vue";
import { EventData, GestureEventData, ShownModallyData, View } from "@nativescript/core";

type ViewEventData<T> = Omit<EventData, 'object'> & {
    object: T;
};
type ViewGestureEventData<T> = Omit<GestureEventData, 'object'> & {
    object: T;
};
type ViewShownModallyData<T> = Omit<ShownModallyData, 'object'> & {
    object: T;
};
interface Event<T = View> {
    /* Lifecycle */
    loaded?: (eventData: ViewEventData<T>) => void;
    unloaded?: (eventData: ViewEventData<T>) => void;
    layoutChanged?: (eventData: ViewEventData<T>) => void;
    /* Gesture */
    tap?: (eventData: ViewGestureEventData<T>) => void;
    doubleTap?: (eventData: ViewGestureEventData<T>) => void;
    pinch?: (eventData: ViewGestureEventData<T>) => void;
    pan?: (eventData: ViewGestureEventData<T>) => void;
    swipe?: (eventData: ViewGestureEventData<T>) => void;
    rotation?: (eventData: ViewGestureEventData<T>) => void;
    longPress?: (eventData: ViewGestureEventData<T>) => void;
    touch?: (eventData: ViewGestureEventData<T>) => void;
    /* Modals */
    showingModally?: (eventData: ViewShownModallyData<T>) => void;
    shownModally?: (eventData: ViewShownModallyData<T>) => void;
/* Accessibility */
    accessibilityBlur?: (eventData: ViewEventData<T>) => void;
    accessibilityFocus?: (eventData: ViewEventData<T>) => void;
    accessibilityFocusChanged?: (eventData: ViewEventData<T>) => void;
    accessibilityPerformEscape?: (eventData: ViewEventData<T>) => void;
    /* Layouts */
    scroll?: (eventData: ViewScrollEventData) => void;
}
/**
 * Register using view.on on mounted, and view.off automatically on unmounted.
 *
 *
 * @param target
 * @param events
 */
export declare function useEventListener<T extends View = View>(target: T | ViewRef<T>, events: Event<T>): {
    cleanup: () => void;
};

```
