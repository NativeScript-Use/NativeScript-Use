import { Application, CoreTypes } from "@nativescript/core";

export abstract class OrientationBase {
    protected callback: any
    abstract getOrientation(): CoreTypes.DeviceOrientationType
    abstract enableRotation(): void
    abstract disableRotation(): void
    abstract setOrientation(value: 'landscape' | 'landscaperight' | 'landscapeleft' | 'portrait', animation: false): void
    abstract setFullScreen(fullScreen: boolean): void

    onChangedOrientation(newCallback: (newValue: CoreTypes.DeviceOrientationType) => void): void {
        this.callback = newCallback;

        Application.on(Application.orientationChangedEvent, this.callback);
    }

    offChangedOrientation() {
        Application.off(Application.orientationChangedEvent, this.callback);
        this.callback = null;
    }
}