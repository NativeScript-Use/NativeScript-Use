import { Application, CoreTypes, Device, Frame, Utils, isAndroid, isIOS } from "@nativescript/core";



export const orientationCore = {
    interfaceOrientationMask: null as any,
    lockRotation: false,
    getOrientation(): CoreTypes.DeviceOrientationType {
        if (isAndroid) {
            const orientation = Utils.android.getApplicationContext().getResources().getConfiguration().orientation;
            if (orientation === android.content.res.Configuration.ORIENTATION_LANDSCAPE) {
                return CoreTypes.DeviceOrientation.landscape;
            } else if (orientation === android.content.res.Configuration.ORIENTATION_PORTRAIT) {
                return CoreTypes.DeviceOrientation.portrait;
            }
        } else if (isIOS) {
            var device = UIDevice.currentDevice;

            switch (device.orientation) {
                case UIDeviceOrientation.LandscapeLeft:
                case UIDeviceOrientation.LandscapeRight:
                    return CoreTypes.DeviceOrientation.landscape;
                case UIDeviceOrientation.Portrait:
                case UIDeviceOrientation.PortraitUpsideDown:
                    return CoreTypes.DeviceOrientation.portrait;
                default:

                    let orientation: any = undefined;
                    if (parseFloat(Device.osVersion) >= 13) {
                        orientation = UIApplication.sharedApplication?.windows?.firstObject?.windowScene?.interfaceOrientation ?? CoreTypes.DeviceOrientation.unknown
                    } else {
                        orientation = UIApplication.sharedApplication?.statusBarOrientation ?? CoreTypes.DeviceOrientation.unknown;
                    }
                    if (orientation === 1 || orientation === 2) { return CoreTypes.DeviceOrientation.portrait; }
                    else if (orientation && orientation !== CoreTypes.DeviceOrientation.unknown) { return CoreTypes.DeviceOrientation.landscape; }

            }
        }
        return CoreTypes.DeviceOrientation.unknown;
    },
    onChangedOrientation(callback: (newValue: CoreTypes.DeviceOrientationType) => void) {
        Application.on(Application.orientationChangedEvent, (data) => {
            callback((data as any).newValue as CoreTypes.DeviceOrientationType);
        });
    },
    enableRotation() {
        if (isAndroid) {
            Utils.android.getCurrentActivity().setRequestedOrientation(13);  // SCREEN_ORIENTATION_FULL_USER = 13
        } else if (isIOS) {
            orientationCore.interfaceOrientationMask = UIInterfaceOrientationMask.All;
            orientationCore.lockRotation = false;
            updateiOSLockScreen();
        }
    },
    disableRotation() {
        if (isAndroid) {
            Utils.android.getCurrentActivity().setRequestedOrientation(14); // SCREEN_ORIENTATION_LOCKED = 14
        } else if (isIOS) {
            orientationCore.interfaceOrientationMask = getMakFormInterfaceOrientation();
            orientationCore.lockRotation = true;
            updateiOSLockScreen();
        }
    },
    setOrientation(value: 'landscape' | 'landscaperight' | 'landscapeleft' | 'portrait', animation = false) {
        if (isAndroid) {
            var val = value.toLowerCase();
            var newOrientation;
            switch (val) {
                case 'landscape':
                    newOrientation = 6; // SCREEN_ORIENTATION_SENSOR_LANDSCAPE = 6
                    break;

                case 'landscaperight':
                    newOrientation = 0; // SCREEN_ORIENTATION_LANDSCAPE = 0
                    break;

                case 'landscapeleft':
                    newOrientation = 8; // SCREEN_ORIENTATION_REVERSE_LANDSCAPE = 9
                    break;

                case 'portrait':
                default:
                    newOrientation = 1; // SCREEN_ORIENTATION_PORTRAIT = 1
                    break;
            }
            Utils.android.getCurrentActivity().setRequestedOrientation(newOrientation);
        } else if (isIOS) {
            if (parseFloat(Device.osVersion) >= 16) {
                var newOrientation, val = value.toLowerCase();
                if (val === 'landscape' || val === 'landscaperight') {
                    newOrientation = UIInterfaceOrientationMask.LandscapeRight;
                } else if (val === 'landscapeleft') {
                    newOrientation = UIInterfaceOrientationMask.LandscapeLeft;
                } else {
                    newOrientation = UIInterfaceOrientationMask.Portrait;
                }

                UINavigationController.attemptRotationToDeviceOrientation();
                const orientation = UIWindowSceneGeometryPreferencesIOS.alloc()
                    .initWithInterfaceOrientations(newOrientation)
                let windowScene: UIWindowScene = UIApplication.sharedApplication.connectedScenes.allObjects[0] as UIWindowScene
                windowScene?.requestGeometryUpdateWithPreferencesErrorHandler(orientation,
                    (e) => {
                        console.log(e);
                    })
            } else {
                var newOrientation, val = value.toLowerCase();
                if (val === 'landscape' || val === 'landscaperight') {
                    newOrientation = NSNumber.numberWithInt(UIDeviceOrientation.LandscapeRight);
                } else if (val === 'landscapeleft') {
                    newOrientation = NSNumber.numberWithInt(UIDeviceOrientation.LandscapeLeft);
                } else {
                    newOrientation = NSNumber.numberWithInt(UIDeviceOrientation.Portrait);
                }
                var device = UIDevice.currentDevice;
                if (animation === false) {
                    UIView.setAnimationsEnabled(false);
                }

                var currentOrientation = device.orientation;
                // We have to swap to a different orientation FIRST, if the current orientation matches
                if (newOrientation === currentOrientation) {
                    var tempOrientation = newOrientation - 1;
                    if (tempOrientation < 1) { tempOrientation += 2; }
                    device.setValueForKey(tempOrientation, "orientation");
                }

                device.setValueForKey(newOrientation, "orientation");

                if (animation === false) {
                    UIView.setAnimationsEnabled(true);
                }
            }
        }
    },
    setFullScreen(fullScreen: boolean) {
        if (isAndroid) {
            var View = android.view.View;
            var WindowManager = android.view.WindowManager;
            var window = Utils.android.getCurrentActivity().getWindow();

            fullScreen = !!fullScreen;

            if (fullScreen) {
                window.setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
                window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
            } else {
                window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
                window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
            }
        } else if (isIOS) {
            // TODO
            //     UIApplication.sharedApplication.setStatusBarHiddenWithAnimation(fullScreen, UIStatusBarAnimation.Slide)
            //     var app = iosProperty(UIApplication, UIApplication.sharedApplication);
            //     app.setStatusBarHiddenWithAnimation(fullScreen, UIStatusBarAnimation.None);
        }

    }
}

function updateiOSLockScreen() {

    UINavigationController.attemptRotationToDeviceOrientation();
    var app: UIViewController = Frame.topmost().ios.controller;
    var shouldAutorotate = findRootPrototype(app, "shouldAutorotate");
    var shouldAutorotateToInterfaceOrientation = findRootPrototype(app, "shouldAutorotateToInterfaceOrientation");

    Object.defineProperty(shouldAutorotate, "shouldAutorotate", {
        get: function () {
            //console.log("shouldAutorotate rotate");
            return !orientationCore.lockRotation;
        }, enumerable: true, configurable: true
    });

    Object.defineProperty(shouldAutorotateToInterfaceOrientation, "shouldAutorotateToInterfaceOrientation", {
        get: function () {
            //console.log("shouldAutorotateToInterfaceOrientation rotate");
            return !orientationCore.lockRotation;
        }, enumerable: true, configurable: true
    });
    if (parseFloat(Device.osVersion) >= 16) {
        var supportedInterfaceOrientations = findRootPrototype(app, "supportedInterfaceOrientations");

        Object.defineProperty(supportedInterfaceOrientations, "supportedInterfaceOrientations", {
            get: function () {
                //console.log("supportedInterfaceOrientations rotate " + orientationCore.interfaceOrientationMask);
                return orientationCore.interfaceOrientationMask;
            }, enumerable: true, configurable: true
        });
    }
}
function getMakFormInterfaceOrientation() {
    const orientation = UIApplication.sharedApplication?.windows?.firstObject?.windowScene?.interfaceOrientation;
    switch (orientation) {
        case UIInterfaceOrientation.LandscapeLeft:
            return UIInterfaceOrientationMask.LandscapeLeft
        case UIInterfaceOrientation.LandscapeRight:
            return UIInterfaceOrientationMask.LandscapeRight
        case UIInterfaceOrientation.Portrait:
            return UIInterfaceOrientationMask.Portrait
        case UIInterfaceOrientation.PortraitUpsideDown:
            return UIInterfaceOrientationMask.PortraitUpsideDown
        default:
            return UIInterfaceOrientationMask.Portrait
    }
}

function findRootPrototype(source: any, name: any) {
    var proto = source;
    do {
        proto = Object.getPrototypeOf(proto);
    } while (proto !== null && !proto.hasOwnProperty(name));
    return proto;
}