import { onUnmounted, ref } from "nativescript-vue"
import { Clipboard } from "@vallemar/nativescript-clipboard";
import { onApplicationMounted } from "../onApplicationMounted";

/**
 * Reactive Clipboard API. Provides the ability to respond to clipboard commands.
 *
 */
export function useClipboard(options?: { sync?: boolean }
) {
    const {
        sync = false
    } = options ?? {}

    let clipboard: Clipboard | undefined;

    const copied = ref(false);
    const text = ref("");

    const copy = (text: string) => {
        copied.value = clipboard?.copy(text) ?? false
    }

    const read = () => {
        text.value = clipboard?.read() ?? "";
        return text.value;
    }

    onApplicationMounted(() => {
        if (!clipboard)
            clipboard = new Clipboard();
        if (sync) {
            text.value = clipboard.read();
            clipboard.onCopy((copyText) => {
                text.value = copyText;
            })
        }
    }, () => {
        clipboard = new Clipboard();
        if (sync) {
            text.value = clipboard.read();
        }
    })

    onUnmounted(() => {
        clipboard?.offCopy();
    })

    return {
        text,
        copied,
        copy,
        read
    }
}

