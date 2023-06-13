import { CoreTypes, Device, Frame } from "@nativescript/core";
import { OrientationBase } from "./core-common";


export class Orientation extends OrientationBase {
    protected interfaceOrientationMask: any;
    protected lockRotation = false;

    getOrientation(): CoreTypes.DeviceOrientationType {
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
        return CoreTypes.DeviceOrientation.unknown;
    }

    enableRotation(): void {
        this.interfaceOrientationMask = UIInterfaceOrientationMask.All;
        this.lockRotation = false;
        this.updateiOSLockScreen();
    }

    disableRotation(): void {
        this.interfaceOrientationMask = this.getMakFormInterfaceOrientation();
        this.lockRotation = true;
        this.updateiOSLockScreen();
    }

    setOrientation(value: "portrait" | "landscape" | "landscaperight" | "landscapeleft", animation: false): void {
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
    
    setFullScreen(fullScreen: boolean): void {
        throw new Error("Method not implemented.");
    }

    private updateiOSLockScreen() {

        UINavigationController.attemptRotationToDeviceOrientation();
        var app: UIViewController = Frame.topmost().ios.controller;
        var shouldAutorotate = this.findRootPrototype(app, "shouldAutorotate");
        var shouldAutorotateToInterfaceOrientation = this.findRootPrototype(app, "shouldAutorotateToInterfaceOrientation");

        Object.defineProperty(shouldAutorotate, "shouldAutorotate", {
            get: function () {
                //console.log("shouldAutorotate rotate");
                return !this.lockRotation;
            }, enumerable: true, configurable: true
        });

        Object.defineProperty(shouldAutorotateToInterfaceOrientation, "shouldAutorotateToInterfaceOrientation", {
            get: function () {
                //console.log("shouldAutorotateToInterfaceOrientation rotate");
                return !this.lockRotation;
            }, enumerable: true, configurable: true
        });
        if (parseFloat(Device.osVersion) >= 16) {
            var supportedInterfaceOrientations = this.findRootPrototype(app, "supportedInterfaceOrientations");

            Object.defineProperty(supportedInterfaceOrientations, "supportedInterfaceOrientations", {
                get: function () {
                    //console.log("supportedInterfaceOrientations rotate " + orientationCore.interfaceOrientationMask);
                    return this.interfaceOrientationMask;
                }, enumerable: true, configurable: true
            });
        }

    }

    private getMakFormInterfaceOrientation() {
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

    private findRootPrototype(source: any, name: any) {
        var proto = source;
        do {
            proto = Object.getPrototypeOf(proto);
        } while (proto !== null && !proto.hasOwnProperty(name));
        return proto;
    }
}