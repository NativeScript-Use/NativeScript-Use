import { CoreTypes, Utils } from "@nativescript/core";
import { OrientationBase } from "./core-common";


export class Orientation extends OrientationBase {
    getOrientation(): CoreTypes.DeviceOrientationType {
        const orientation = Utils.android.getApplicationContext().getResources().getConfiguration().orientation;
        if (orientation === android.content.res.Configuration.ORIENTATION_LANDSCAPE) {
            return CoreTypes.DeviceOrientation.landscape;
        } else if (orientation === android.content.res.Configuration.ORIENTATION_PORTRAIT) {
            return CoreTypes.DeviceOrientation.portrait;
        }
        return CoreTypes.DeviceOrientation.unknown;
    }

    enableRotation(): void {
        Utils.android.getCurrentActivity().setRequestedOrientation(13);
    }

    disableRotation(): void {
        Utils.android.getCurrentActivity().setRequestedOrientation(14);
    }

    setOrientation(value: "portrait" | "landscape" | "landscaperight" | "landscapeleft", animation: false): void {
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
    }
    
    setFullScreen(fullScreen: boolean): void {
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
    }

}