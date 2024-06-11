import { Application, Frame } from '@nativescript/core';

export const onApplicationMounted = (callback: () => void, immediateCallback?: () => void) => {
  if (Frame.topmost()) {
    immediateCallback ? immediateCallback() : null;
    callback();
  } else {
    const run = () => {
      setTimeout(callback, 0);
      Application.off('launch', run);
    };
    Application.on('launch', run);
  }
};
