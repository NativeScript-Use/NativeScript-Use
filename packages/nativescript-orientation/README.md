# @vallemar/nativescript-orientation

```javascript
npm install @vallemar/nativescript-orientation
```

## Usage

```ts
import { Orientation } from "@vallemar/nativescript-orientation"

const orientation = new Orientation();

// Get current orientation
const currentOrientation = orientation.getOrientation();

// Change orientation. values: 'landscape' | 'landscaperight' | 'landscapeleft' | 'portrait'
orientation.setOrientation('landscape');

// Enable rotation
orientation.enableRotation();

// Disable rotation
orientation.disableRotation();

// Add listener
orientation.onChangedOrientation((newValue: CoreTypes.DeviceOrientationType) =>{
  console.log(newValue)
});
// Remove listener
orientation.offChangedOrientation();
```

Type declaration
```ts
export declare class Orientation {
  getOrientation(): CoreTypes.DeviceOrientationType
  onChangedOrientation(callback: (newValue: CoreTypes.DeviceOrientationType) => void): void
  offChangedOrientation(): void
  enableRotation(): void
  disableRotation(): void
  setOrientation(value: 'landscape' | 'landscaperight' | 'landscapeleft' | 'portrait', animation: false): void
}
```

## License

Apache License Version 2.0


