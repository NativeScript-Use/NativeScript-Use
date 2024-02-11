# @nativescript-use/change-icon

Programmatically change the application icon.

## Install
```javascript
npm install @nativescript-use/change-icon
```

## Configuration

### Android

To begin, we must define our icons in `App_Resources/Android/src/main/res`, we recommend the page https://icon.kitchen/ to generate the icons for our application. This document will create 3 icons for the sample:
- Default Icon.
- Dark icon.
- Cafe icon.

1. Generate the icons and add them to `App_Resources/Android/src/main/res/mipmap`.

- ic_launcher_foreground_[default|dark|cafe].png (`Icon`)
- ic_launcher_background__[default|dark|cafe].png (`Icon Background`)

1. Add the `adaptive-icon` to your `mipmap-anydpi-v26` folder inside `App_Resources/Android/src/main/res/`.

- `mipmap-anydpi-v26/ic_launcher_default.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background_default"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground_default"/>
</adaptive-icon>
```

- `mipmap-anydpi-v26/ic_launcher_dark.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background_dark"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground_dark"/>
</adaptive-icon>
```
- `mipmap-anydpi-v26/ic_launcher_cafe.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background_cafe"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground_cafe"/>
</adaptive-icon>
```

3. Add `activity-alias` to our `AndroidManifest.xml`. To change the icon in android we need to specify an `activity-alias` in `AndroidManifest.xml` plus one for the default icon, so for this example we will have 3 activity-aliases in our manifest:

```xml

 <application
        android:name="com.tns.NativeScriptApplication"
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher_default"
        android:roundIcon="@mipmap/ic_launcher_default"
        android:theme="@style/AppTheme">

        <activity
            android:name="com.tns.NativeScriptActivity"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize|smallestScreenSize|screenLayout|locale|uiMode"
            android:exported="true"
            android:hardwareAccelerated="true"
            android:label="@string/title_activity_kimera"
            android:launchMode="singleTask"
            android:theme="@style/AppTheme">
            
            <meta-data android:name="SET_THEME_ON_LAUNCH" android:resource="@style/AppTheme" />
            <intent-filter>
                <!-- Note that here we have removed <category android:name="android.intent.category.LAUNCHER" /> -->
                <action android:name="android.intent.action.MAIN" />
            </intent-filter>
        </activity>

        <activity-alias
            android:name=".MainActivityDefault"
            android:enabled="true"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_default"
            android:label="@string/title_activity_kimera"
            android:targetActivity="com.tns.NativeScriptActivity">
            <meta-data
                android:name="SET_THEME_ON_LAUNCH"
                android:resource="@style/AppTheme" />
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>
        <activity-alias
            android:name=".MainActivityDark"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_dark"
            android:label="@string/title_activity_kimera"
            android:targetActivity="com.tns.NativeScriptActivity">
            <meta-data
                android:name="SET_THEME_ON_LAUNCH"
                android:resource="@style/AppTheme" />
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>
         <activity-alias
            android:name=".MainActivityCafe"
            android:enabled="false"
            android:exported="true"
            android:icon="@mipmap/ic_launcher_cafe"
            android:label="@string/title_activity_kimera"
            android:targetActivity="com.tns.NativeScriptActivity">
            <meta-data
                android:name="SET_THEME_ON_LAUNCH"
                android:resource="@style/AppTheme" />
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>
        <activity android:name="com.tns.ErrorReportActivity" />
    </application>
```

Note here the important things from the previous code:

- Removed `<category android:name="android.intent.category.LAUNCHER" />` from the main activity `activity`.
- We have 3 `activity-alias`, for Default, Dark and Cafe.
- Activity alias of `activity-alias` of `MainActivityDefault` has `android:enabled="true"` by default.
- All other `activity-aliases` have `android:enabled="false"`
- `android:name` of the `activity-alias` tags must always have the format `.MainActivity[The name we will use to change]`, in this case: `MainActivityDefault`, `MainActivityDark`, `MainActivityCafe`.
- `android:icon` and `android:roundIcon` have the icon we added earlier.
- `android:targetActivity` has the value of the main activity, default for NativeScript: `com.tns.NativeScriptActivity`.


### iOS

To begin, we must define our icons in `App_Resources/iOS`, we recommend the page https://icon.kitchen/ to generate the icons for our application. This document will create 3 icons for the sample:
- Default Icon.
- Dark icon.
- Cafe icon.

1. Have the Default icon in the `App_Resources/iOS/Assets.xcassets/AppIcon.appiconset` folder
2. Generate the icons and add them to `App_Resources/iOS`.

- [Dark|Cafe]@x2.png (120x120 Dimensions)
- [Dark|Cafe]@x3.png (180x180 Dimensions)

3. Add in `Info.plist` (`App_Resources/iOS/Info.plist`) the following code to indicate which is the default and which are the alternatives:

```xml
<key>CFBundleIcons</key>
<dict>
    <key>CFBundlePrimaryIcon</key>
    <dict>
        <key>CFBundleIconFiles</key>
        <array>
            <string>Default</string>
        </array>
        <key>UIPrerenderedIcon</key>
        <false/>
    </dict>
    <key>CFBundleAlternateIcons</key>
    <dict>
        <key>Dark</key>
        <dict>
            <key>CFBundleIconFiles</key>
            <array>
                <string>Dark</string>
            </array>
            <key>UIPrerenderedIcon</key>
            <false/>
        </dict>
        <key>Cafe</key>
        <dict>
            <key>CFBundleIconFiles</key>
            <array>
                <string>Cafe</string>
            </array>
            <key>UIPrerenderedIcon</key>
            <false/>
        </dict>
    </dict>
</dict>
```


### Usage

You just have to import the library and use the available methods 
- `getCurrent()`
- `reset()`
- `change("NameOfIcon")`

```ts
import { changeIcon } from "@nativescript-use/change-icon"

function changeIconToDark(){
    changeIcon.change("Dark");
}

function changeIconToCafe(){
    changeIcon.change("Cafe");
}

function changeIconToDefault(){
    changeIcon.reset();
}

function getCurrentIcon(){
    return changeIcon.getCurrent(); // "Default" | "Dark" | "Cafe"
}


```
## License

Apache License Version 2.0
