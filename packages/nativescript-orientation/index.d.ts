
export declare class Orientation {
    getOrientation(): CoreTypes.DeviceOrientationType
    onChangedOrientation(callback: (newValue: CoreTypes.DeviceOrientationType) => void): void
    offChangedOrientation(): void
    enableRotation(): void
    disableRotation(): void
    setOrientation(value: 'landscape' | 'landscaperight' | 'landscapeleft' | 'portrait', animation: false): void
    setFullScreen(fullScreen: boolean): void

}