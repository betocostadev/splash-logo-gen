# Splash Logo Gen

## Description

Splash screen and icon generator for Apps.
This app will generate icons and logos for Desktop, iOS and Android.

### Usage

How to use this app?
You'll need to follow some steps to be able to create the images correctly.

1. Place an logo image with the name `logo.png` at the **root** path of the app.
2. Place an `icon.png` image at the **root** path of the app.
3. At the **root** directory of the app run `npm i` to install the dependencies.
4. Run the App with `node .`
   1. **Option 1** will create images and icons for desktop, iOS and Android.
   2. **Option 2** will create images and icons for desktop and Android.
   3. **Option 3** wil create images and icons for iOS only.
   4. **Option 4** will close the app and it will not create any images.

### Dependencies

- **node**
- jimp
- chalk
- cli-select
