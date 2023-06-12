import { onMounted, onUnmounted } from "nativescript-vue"
import { unrefView } from "../unrefView"
import { ViewRef } from "../types"
import {EventData, GestureEventData, ShownModallyData, View} from "@nativescript/core"

type ViewEventData<T> = Omit<EventData, 'object'> & { object: T }
type ViewGestureEventData<T> = Omit<GestureEventData, 'object'> & { object: T }
type ViewShownModallyData<T> = Omit<ShownModallyData, 'object'> & { object: T }

interface Event<T = View>{
    /* Lifecycle */
    loaded?: (eventData: ViewEventData<T> ) => void,
    unloaded?: (eventData: ViewEventData<T>) => void,
    layoutChanged?: (eventData: ViewEventData<T>) => void,
    /* Gesture */
    tap?: (eventData: ViewGestureEventData<T>) => void,
    doubleTap?: (eventData: ViewGestureEventData<T>) => void,
    pinch?: (eventData: ViewGestureEventData<T>) => void,
    pan?: (eventData: ViewGestureEventData<T>) => void,
    swipe?: (eventData: ViewGestureEventData<T>) => void,
    rotation?: (eventData: ViewGestureEventData<T>) => void,
    longPress?: (eventData: ViewGestureEventData<T>) => void,
    touch?: (eventData: ViewGestureEventData<T>) => void,
    /* Modals */
    showingModally?: (eventData: ViewShownModallyData<T>) => void,
    shownModally?: (eventData: ViewShownModallyData<T>) => void,
    /* Accessibility */
    accessibilityBlur?: (eventData: ViewEventData<T>) => void,
    accessibilityFocus?: (eventData: ViewEventData<T>) => void,
    accessibilityFocusChanged?: (eventData: ViewEventData<T>) => void,
    accessibilityPerformEscape?: (eventData: ViewEventData<T>) => void,
}

/**
 * Register using view.on on mounted, and view.off automatically on unmounted.
 *
 *
 * @param target
 * @param events
 */
export function useEventListener<T extends View = View>(
    target: ViewRef<T>,
    events: Event<T>,
) {
    const el = target;

    const fireEvent = (onEvent: any) => (args: any) => onEvent(args);

    onMounted(() => {
        Object.keys(events).forEach((event) => {
            unrefView(el)?.on(event, fireEvent((events as any)[event]));
        })
    })

    onUnmounted(() => {
        cleanup();
    })

    function cleanup() {
        Object.keys(events).forEach(event => {
            unrefView(el)?.off(event, fireEvent((events as any)[event]));
        })
    }
    return {
        cleanup,
    }
}

