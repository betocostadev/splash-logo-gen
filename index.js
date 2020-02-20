const fs = require('fs')
const chalk = require('chalk')
const Jimp = require('jimp')
const inquirer = require('inquirer')

const platforms = [ '1. All', '2. Android', '3. iOS' ]
const colors = [ 'White (#ffffff)', 'Black (#000000)', 'Transparent (#ffffff00)', 'Custom' ]
const userAnswers = []
let iosLogo, logoSource, iconSource, setColor

// Welcome message
console.log(chalk.blue.bold(`
    Welcome to SplashLogoGen!
    `))

// ARRAYS WITH ICONS AND LOGOS DATA FOR ALL PLATFORMS:
// Data for iOS icons
const iosIcons = [
	{
		hasBackground: true,
		iconSizeX: 57,
		iconSizeY: 57,
		backgroundImg: setColor,
		backgroundSizeX: 57,
		backgroundSizeY: 57,
		savePath: 'dist/ios/icons/icon.png'
	},
	{
		hasBackground: false,
		iconSizeX: 20,
		iconSizeY: 20,
		backgroundImg: setColor,
		backgroundSizeX: 20,
		backgroundSizeY: 20,
		savePath: 'dist/ios/icons/icon-20.png'
	},
	{
    hasBackground: true,
    iconSizeX: 114,
    iconSizeY: 114,
    backgroundImg: setColor,
    backgroundSizeX: 114,
    backgroundSizeY: 114,
    savePath: 'dist/ios/icons/icon@2x.png'
  },
	{
    hasBackground: true,
    iconSizeX: 40,
    iconSizeY: 40,
    backgroundImg: setColor,
    backgroundSizeX: 40,
    backgroundSizeY: 40,
    savePath: 'dist/ios/icons/icon-20@2x.png'
  },
  {
    hasBackground: true,
    iconSizeX: 60,
    iconSizeY: 60,
    backgroundImg: setColor,
    backgroundSizeX: 60,
    backgroundSizeY: 60,
    savePath: 'dist/ios/icons/icon-20@3x.png'
  },
  {
    hasBackground: true,
    iconSizeX: 48,
    iconSizeY: 48,
    backgroundImg: setColor,
    backgroundSizeX:48,
    backgroundSizeY:48,
    savePath: 'dist/ios/icons/icon-24@2x.png'
  },
	{
    hasBackground: true,
    iconSizeX: 55,
    iconSizeY: 55,
    backgroundImg: setColor,
    backgroundSizeX: 55,
    backgroundSizeY: 55,
    savePath: 'dist/ios/icons/icon-27.5@2x.png'
  },
	{
    hasBackground: true,
    iconSizeX: 55,
    iconSizeY: 55,
    backgroundImg: setColor,
    backgroundSizeX: 55,
    backgroundSizeY: 55,
    savePath: 'dist/ios/icons/icon-27.png'
  },
	{
    hasBackground: true,
    iconSizeX: 29,
    iconSizeY: 29,
    backgroundImg: setColor,
    backgroundSizeX: 29,
    backgroundSizeY: 29,
    savePath: 'dist/ios/icons/icon-29.png'
  },
  {
		hasBackground: false,
		iconSizeX: 40,
		iconSizeY: 40,
		backgroundImg: setColor,
		backgroundSizeX: 40,
		backgroundSizeY: 40,
		savePath: 'dist/ios/icons/icon-40.png'
	},
	{
    hasBackground: true,
    iconSizeX: 80,
    iconSizeY: 80,
    backgroundImg: setColor,
    backgroundSizeX:80,
    backgroundSizeY:80,
    savePath: 'dist/ios/icons/icon-40@2x.png'
  },
	{
    hasBackground: true,
    iconSizeX: 58,
    iconSizeY: 58,
    backgroundImg: setColor,
    backgroundSizeX:58,
    backgroundSizeY:58,
    savePath: 'dist/ios/icons/icon-29@2x.png'
  },
	{
    hasBackground: true,
    iconSizeX: 87,
    iconSizeY: 87,
    backgroundImg: setColor,
    backgroundSizeX: 87,
    backgroundSizeY: 87,
    savePath: 'dist/ios/icons/icon-29@3x.png'
  },
	{
    hasBackground: true,
    iconSizeX: 88,
    iconSizeY: 88,
    backgroundImg: setColor,
    backgroundSizeX:88,
    backgroundSizeY:88,
    savePath: 'dist/ios/icons/icon-44@2x.png'
  },
	{
    hasBackground: false,
    iconSizeX: 50,
    iconSizeY: 50,
    backgroundImg: setColor,
    backgroundSizeX: 50,
    backgroundSizeY: 50,
    savePath: 'dist/ios/icons/icon-50.png'
  },
	{
    hasBackground: false,
    iconSizeX: 100,
    iconSizeY: 100,
    backgroundImg: setColor,
    backgroundSizeX: 100,
    backgroundSizeY: 100,
    savePath: 'dist/ios/icons/icon-50@2x.png'
  },
	{
    hasBackground: false,
    iconSizeX: 120,
    iconSizeY: 120,
    backgroundImg: setColor,
    backgroundSizeX: 120,
    backgroundSizeY: 120,
    savePath: 'dist/ios/icons/icon-60@2x.png'
  },
	{
    hasBackground: false,
    iconSizeX: 180,
    iconSizeY: 180,
    backgroundImg: setColor,
    backgroundSizeX: 180,
    backgroundSizeY: 180,
    savePath: 'dist/ios/icons/icon-60@3x.png'
  },
	{
    hasBackground: true,
    iconSizeX: 72,
    iconSizeY: 72,
    backgroundImg: setColor,
    backgroundSizeX:72,
    backgroundSizeY:72,
    savePath: 'dist/ios/icons/icon-72.png'
  },
	{
    hasBackground: true,
    iconSizeX: 144,
    iconSizeY: 144,
    backgroundImg: setColor,
    backgroundSizeX:144,
    backgroundSizeY:144,
    savePath: 'dist/ios/icons/icon-72@2x.png'
  },
	{
    hasBackground: true,
    iconSizeX: 76,
    iconSizeY: 76,
    backgroundImg: setColor,
    backgroundSizeX:76,
    backgroundSizeY:76,
    savePath: 'dist/ios/icons/icon-76.png'
  },
	{
    hasBackground: false,
    iconSizeX: 152,
    iconSizeY: 152,
    backgroundImg: setColor,
    backgroundSizeX: 152,
    backgroundSizeY: 152,
    savePath: 'dist/ios/icons/icon-76@2x.png'
  },
	{
    hasBackground: false,
    iconSizeX: 167,
    iconSizeY: 167,
    backgroundImg: setColor,
    backgroundSizeX: 167,
    backgroundSizeY: 167,
    savePath: 'dist/ios/icons/icon-83.5@2x.png'
  },
	{
    hasBackground: false,
    iconSizeX: 167,
    iconSizeY: 167,
    backgroundImg: setColor,
    backgroundSizeX: 167,
    backgroundSizeY: 167,
    savePath: 'dist/ios/icons/icon-83.png'
  },
	{
    hasBackground: true,
    iconSizeX: 172,
    iconSizeY: 172,
    backgroundImg: setColor,
    backgroundSizeX:172,
    backgroundSizeY:172,
    savePath: 'dist/ios/icons/icon-86@2x.png'
  },
	{
    hasBackground: true,
    iconSizeX: 196,
    iconSizeY: 196,
    backgroundImg: setColor,
    backgroundSizeX:196,
    backgroundSizeY:196,
    savePath: 'dist/ios/icons/icon-98@2x.png'
  },
	{
    hasBackground: true,
    iconSizeX: 1024,
    iconSizeY: 1024,
    backgroundImg: setColor,
    backgroundSizeX:1024,
    backgroundSizeY:1024,
    savePath: 'dist/ios/icons/icon-1024.png'
  },
	{
    hasBackground: false,
    iconSizeX: 29,
    iconSizeY: 29,
    backgroundImg: setColor,
    backgroundSizeX: 29,
    backgroundSizeY: 29,
    savePath: 'dist/ios/icons/icon-small.png'
  },
	{
    hasBackground: false,
    iconSizeX: 58,
    iconSizeY: 58,
    backgroundImg: setColor,
    backgroundSizeX: 58,
    backgroundSizeY: 58,
    savePath: 'dist/ios/icons/icon-small@2x.png'
  },
	{
    hasBackground: false,
    iconSizeX: 87,
    iconSizeY: 87,
    backgroundImg: setColor,
    backgroundSizeX: 87,
    backgroundSizeY: 87,
    savePath: 'dist/ios/icons/icon-small@3x.png'
  },
]

// Data for iOS Splash screens
const iosSplashData = [
  {
    name: 'Default-568h@2x~iphone',
    backgroundSizeX: 640,
    backgroundSizeY: 1136,
    color: setColor,
    logoSizeX: 640,
    logoSizeY: 640,
    blitX: 0,
    blitY: 248,
    save: 'dist/ios/splashscreen/Default-568h@2x~iphone.png'
  },
  {
    name: 'Default-667h',
    backgroundSizeX: 750,
    backgroundSizeY: 1334,
    color: setColor,
    logoSizeX: 750,
    logoSizeY: 750,
    blitX: 0,
    blitY: 292,
    save: 'dist/ios/splashscreen/Default-667h.png'
  },
  {
    name: 'Default-736h',
    backgroundSizeX: 1242,
    backgroundSizeY: 2208,
    color: setColor,
    logoSizeX: 1024,
    logoSizeY: 1024,
    blitX: 109,
    blitY: 592,
    save: 'dist/ios/splashscreen/Default-736h.png'
  },
  {
    name: 'Default-2436h',
    backgroundSizeX: 1125,
    backgroundSizeY: 2436,
    color: setColor,
    logoSizeX: 1056,
    logoSizeY: 1056,
    blitX: 35,
    blitY: 690,
    save: 'dist/ios/splashscreen/Default-2436h.png'
  },
  {
    name: 'Default@2x~iphone',
    backgroundSizeX: 640,
    backgroundSizeY: 960,
    color: setColor,
    logoSizeX: 640,
    logoSizeY: 640,
    blitX: 0,
    blitY: 160,
    save: 'dist/ios/splashscreen/Default@2x~iphone.png'
  },
  {
    name: 'Default~iphone',
    backgroundSizeX: 320,
    backgroundSizeY: 480,
    color: setColor,
    logoSizeX: 320,
    logoSizeY: 320,
    blitX: 0,
    blitY: 80,
    save: 'dist/ios/splashscreen/Default~iphone.png'
  },
  {
    name: 'Default-Landscape-736h',
    backgroundSizeX: 2208,
    backgroundSizeY: 1242,
    color: setColor,
    logoSizeX: 1024,
    logoSizeY: 1024,
    blitX: 592,
    blitY: 109,
    save: 'dist/ios/splashscreen/Default-Landscape-736h.png'
  },
  {
    name: 'Default-Landscape-2436h',
    backgroundSizeX: 2436,
    backgroundSizeY: 1125,
    color: setColor,
    logoSizeX: 1048,
    logoSizeY: 1048,
    blitX: 694,
    blitY: 39,
    save: 'dist/ios/splashscreen/Default-Landscape-2436h.png'
  },
  {
    name: 'Default-Landscape@2x~ipad',
    backgroundSizeX: 2048,
    backgroundSizeY: 1536,
    color: setColor,
    logoSizeX: 1048,
    logoSizeY: 1048,
    blitX: 500,
    blitY: 244,
    save: 'dist/ios/splashscreen/Default-Landscape@2x~ipad.png'
  },
  {
    name: 'Default-Landscape~ipad',
    backgroundSizeX: 1024,
    backgroundSizeY: 768,
    color: setColor,
    logoSizeX: 768,
    logoSizeY: 768,
    blitX: 128,
    blitY: 0,
    save: 'dist/ios/splashscreen/Default-Landscape~ipad.png'
  },
  {
    name: 'Default-Portrait@2x~ipad',
    backgroundSizeX: 1536,
    backgroundSizeY: 2048,
    color: setColor,
    logoSizeX: 1048,
    logoSizeY: 1048,
    blitX: 244,
    blitY: 500,
    save: 'dist/ios/splashscreen/Default-Portrait@2x~ipad.png'
  },
  {
    name: 'Default-Portrait~ipad',
    backgroundSizeX: 768,
    backgroundSizeY: 1024,
    color: setColor,
    logoSizeX: 768,
    logoSizeY: 768,
    blitX: 0,
    blitY: 128,
    save: 'dist/ios/splashscreen/Default-Portrait~ipad.png'
  }
]

// Data for logos - dimensions and paths
const logosData = [
  {
    name: '1024rb',
    backgroundSizeX: 1024,
    backgroundSizeY: 500,
    color: setColor,
    logoSizeX: 450,
    logoSizeY: 450,
    blitX: 0,
    blitY: 0,
    save: 'dist/1024rb.png'
  },
  {
    name: '512rb',
    backgroundSizeX: 512,
    backgroundSizeY: 512,
    color: setColor,
    logoSizeX: 512,
    logoSizeY: 512,
    blitX: 0,
    blitY: 0,
    save: 'dist/512rb.png'
  },
  {
    name: 'android/drawable-land-hdpi/screen.png',
    backgroundSizeX: 800,
    backgroundSizeY: 480,
    color: setColor,
    logoSizeX: 480,
    logoSizeY: 480,
    blitX: 160,
    blitY: 0,
    save: 'dist/android/drawable-land-hdpi/screen.png'
  },
  {
    name: 'android/drawable-land-ldpi/screen.png',
    backgroundSizeX: 320,
    backgroundSizeY: 200,
    color: setColor,
    logoSizeX: 200,
    logoSizeY: 200,
    blitX: 60,
    blitY: 0,
    save: 'dist/android/drawable-land-ldpi/screen.png'
  },
  {
    name: 'android/drawable-land-mdpi/screen.png',
    backgroundSizeX: 480,
    backgroundSizeY: 320,
    color: setColor,
    logoSizeX: 320,
    logoSizeY: 320,
    blitX: 80,
    blitY: 0,
    save: 'dist/android/drawable-land-mdpi/screen.png'
  },
  {
    name: 'android/drawable-land-xhdpi/screen.png',
    backgroundSizeX: 1280,
    backgroundSizeY: 720,
    color: setColor,
    logoSizeX: 720,
    logoSizeY: 720,
    blitX: 280,
    blitY: 0,
    save: 'dist/android/drawable-land-xhdpi/screen.png'
  },
  {
    name: 'android/drawable-land-xxhdpi/screen.png',
    backgroundSizeX: 1600,
    backgroundSizeY: 960,
    color: setColor,
    logoSizeX: 960,
    logoSizeY: 960,
    blitX: 320,
    blitY: 0,
    save: 'dist/android/drawable-land-xxhdpi/screen.png'
  },
  {
    name: 'android/drawable-land-xxxhdpi/screen.png',
    backgroundSizeX: 1920,
    backgroundSizeY: 1280,
    color: setColor,
    logoSizeX: 960,
    logoSizeY: 960,
    blitX: 480,
    blitY: 160,
    save: 'dist/android/drawable-land-xxxhdpi/screen.png'
  },
  {
    name: 'android/drawable-port-hdpi/screen.png',
    backgroundSizeX: 480,
    backgroundSizeY: 800,
    color: setColor,
    logoSizeX: 480,
    logoSizeY: 480,
    blitX: 0,
    blitY: 160,
    save: 'dist/android/drawable-port-hdpi/screen.png'
  },
  {
    name: 'android/drawable-port-ldpi/screen.png',
    backgroundSizeX: 200,
    backgroundSizeY: 320,
    color: setColor,
    logoSizeX: 200,
    logoSizeY: 200,
    blitX: 0,
    blitY: 60,
    save: 'dist/android/drawable-port-ldpi/screen.png'
  },
  {
    name: 'android/drawable-port-mdpi/screen.png',
    backgroundSizeX: 320,
    backgroundSizeY: 480,
    color: setColor,
    logoSizeX: 320,
    logoSizeY: 320,
    blitX: 0,
    blitY: 80,
    save: 'dist/android/drawable-port-mdpi/screen.png'
  },
  {
    name: 'android/drawable-port-xhdpi/screen.png',
    backgroundSizeX: 720,
    backgroundSizeY: 1280,
    color: setColor,
    logoSizeX: 720,
    logoSizeY: 720,
    blitX: 0,
    blitY: 280,
    save: 'dist/android/drawable-port-xhdpi/screen.png'
  },
  {
    name: 'android/drawable-port-xxhdpi/screen.png',
    backgroundSizeX: 960,
    backgroundSizeY: 1600,
    color: setColor,
    logoSizeX: 960,
    logoSizeY: 960,
    blitX: 0,
    blitY: 320,
    save: 'dist/android/drawable-port-xxhdpi/screen.png'
  },
  {
    name: 'android/drawable-port-xxxhdpi/screen.png',
    backgroundSizeX: 1280,
    backgroundSizeY: 1920,
    color: setColor,
    logoSizeX: 960,
    logoSizeY: 960,
    blitX: 128,
    blitY: 448,
    save: 'dist/android/drawable-port-xxxhdpi/screen.png'
  },
]

// Data for icons - dimensions and paths
const iconsData = [
  {
    iconName: 'android/mipmap-hdpi/icon.png',
    backgroundName: null,
    sizeX: 72,
    sizeY: 72,
    color: setColor,
    xmlPath: null,
    saveIcon: 'dist/android/mipmap-hdpi/icon.png',
    saveBackground: null,
  },
  {
    iconName: 'android/mipmap-hdpi-v26/ic_launcher_foreground.png',
    backgroundName: 'android/mipmap-hdpi-v26/ic_launcher_background.png',
    sizeX: 72,
    sizeY: 72,
    color: setColor,
    xmlPath: 'dist/android/mipmap-hdpi-v26/ic_launcher.xml',
    saveIcon: 'dist/android/mipmap-hdpi-v26/ic_launcher_foreground.png',
    saveBackground: 'dist/android/mipmap-hdpi-v26/ic_launcher_background.png',
  },
  {
    iconName: 'android/mipmap-ldpi/icon.png',
    backgroundName: null,
    sizeX: 36,
    sizeY: 36,
    color: setColor,
    xmlPath: null,
    saveIcon: 'dist/android/mipmap-ldpi/icon.png',
    saveBackground: null,
  },
  {
    iconName: 'android/mipmap-ldpi-v26/ic_launcher_foreground.png',
    backgroundName: 'android/mipmap-ldpi-v26/ic_launcher_background.png',
    sizeX: 36,
    sizeY: 36,
    color: setColor,
    xmlPath: 'dist/android/mipmap-ldpi-v26/ic_launcher.xml',
    saveIcon: 'dist/android/mipmap-ldpi-v26/ic_launcher_foreground.png',
    saveBackground: 'dist/android/mipmap-ldpi-v26/ic_launcher_background.png',
  },
  {
    iconName: 'android/mipmap-mdpi/icon.png',
    backgroundName: null,
    sizeX: 48,
    sizeY: 48,
    color: setColor,
    xmlPath: null,
    saveIcon: 'dist/android/mipmap-mdpi/icon.png',
    saveBackground: null,
  },
  {
    iconName: 'android/mipmap-mdpi-v26/ic_launcher_foreground.png',
    backgroundName: 'android/mipmap-mdpi-v26/ic_launcher_background.png',
    sizeX: 48,
    sizeY: 48,
    color: setColor,
    xmlPath: 'dist/android/mipmap-mdpi-v26/ic_launcher.xml',
    saveIcon: 'dist/android/mipmap-mdpi-v26/ic_launcher_foreground.png',
    saveBackground: 'dist/android/mipmap-mdpi-v26/ic_launcher_background.png',
  },
  {
    iconName: 'android/mipmap-xhdpi/icon.png',
    backgroundName: null,
    sizeX: 144,
    sizeY: 144,
    color: setColor,
    xmlPath: null,
    saveIcon: 'dist/android/mipmap-xhdpi/icon.png',
    saveBackground: null,
  },
  {
    iconName: 'android/mipmap-xhdpi-v26/ic_launcher_foreground.png',
    backgroundName: 'android/mipmap-xhdpi-v26/ic_launcher_background.png',
    sizeX: 216,
    sizeY: 216,
    color: setColor,
    xmlPath: 'dist/android/mipmap-xhdpi-v26/ic_launcher.xml',
    saveIcon: 'dist/android/mipmap-xhdpi-v26/ic_launcher_foreground.png',
    saveBackground: 'dist/android/mipmap-xhdpi-v26/ic_launcher_background.png',
  },
  {
    iconName: 'android/mipmap-xxhdpi/icon.png',
    backgroundName: null,
    sizeX: 144,
    sizeY: 144,
    color: setColor,
    xmlPath: null,
    saveIcon: 'dist/android/mipmap-xxhdpi/icon.png',
    saveBackground: null,
  },
  {
    iconName: 'android/mipmap-xxhdpi-v26/ic_launcher_foreground.png',
    backgroundName: 'android/mipmap-xxhdpi-v26/ic_launcher_background.png',
    sizeX: 324,
    sizeY: 324,
    color: setColor,
    xmlPath: 'dist/android/mipmap-xxhdpi-v26/ic_launcher.xml',
    saveIcon: 'dist/android/mipmap-xxhdpi-v26/ic_launcher_foreground.png',
    saveBackground: 'dist/android/mipmap-xxhdpi-v26/ic_launcher_background.png',
  },
  {
    iconName: 'android/mipmap-xxxhdpi/icon.png',
    backgroundName: null,
    sizeX: 192,
    sizeY: 192,
    color: setColor,
    xmlPath: null,
    saveIcon: 'dist/android/mipmap-xxxhdpi/icon.png',
    saveBackground: null,
  },
  {
    iconName: 'android/mipmap-xxxhdpi-v26/ic_launcher_foreground.png',
    backgroundName: 'android/mipmap-xxxhdpi-v26/ic_launcher_background.png',
    sizeX: 432,
    sizeY: 432,
    color: setColor,
    xmlPath: 'dist/android/mipmap-xxxhdpi-v26/ic_launcher.xml',
    saveIcon: 'dist/android/mipmap-xxxhdpi-v26/ic_launcher_foreground.png',
    saveBackground: 'dist/android/mipmap-xxxhdpi-v26/ic_launcher_background.png',
  },
]

function createBackground(sizeX, sizeY, color) {
  return new Promise((resolve, reject) => {
      new Jimp(sizeX, sizeY, color,  (err, image) => {
          if(err) return reject(err)
          return resolve(image)
      })
  })
}

const startLogoCreation = async function(dataSource) {
  try {
    console.log(chalk.green.bold('Process started. Will generate images...'))

    dataSource.map(foto => {
      createLogos(foto)
    })

  } catch (error) {
    console.error(error)
  }
}

const startIconCreation = async function(dataSource) {
  try {
    console.log(chalk.green.bold('Icon creation started. Will generate icons...'))

    dataSource.map(icon => {
      createIcons(icon)
    })

  } catch (error) {
    console.error(error)
  }
}

const startIosIconCreation = async function(dataSource) {
  try {
    console.log(chalk.green.bold('iOS icon creation started. Will generate icons...'))

    dataSource.map(icon => {
      createIosIcons(icon)
    })

  } catch (error) {
    console.error(error)
  }
}

// Create logos
async function createLogos({ name, backgroundSizeX, backgroundSizeY,	color,	logoSizeX, logoSizeY,	blitX,	blitY, save}) {
  color = setColor
  const logo = await Jimp.read(logoSource)

  try {
    const background = await createBackground(backgroundSizeX, backgroundSizeY,	color)
    // call to blit function - Blit is used to change the position of the logo in relation to the background
    const logoResized = await logo.resize(logoSizeX, logoSizeY)
    background.blit(logoResized, blitX, blitY)
    // write image
		.write(save)
    console.log(`Image: ${name} created.`)

  } catch (error) {
    console.error(error)
  }
}

async function createIosIcons({ hasBackground, backgroundSizeX, backgroundSizeY, color, iconSizeX, iconSizeY, savePath  }) {
  color = setColor
  const icon = await Jimp.read(iconSource)

  try {
    if (hasBackground) {
      const background = await createBackground(backgroundSizeX, backgroundSizeY,	color)
    // call to blit function - Blit is used to change the position of the logo in relation to the background
      const iconResized = await icon.resize(iconSizeX, iconSizeY)
      background.composite(iconResized, 0, 0)
      // write image
      .write(savePath)
      console.log(`iOS icon: ${savePath} created.`)
    } else {
      const iconResized = await icon.resize(iconSizeX, iconSizeY)
      iconResized.write(savePath)
      console.log(`iOS icon: ${savePath} created.`)
    }

  } catch (error) {
    console.log(error)
  }
}


async function createIcons({ iconName, backgroundName, sizeX, sizeY, color, xmlPath, saveIcon, saveBackground}) {
  color = setColor
  const icon = await Jimp.read(iconSource)

  try {
    // Check if it needs a background
    if (backgroundName) {
      const background = await createBackground(sizeX, sizeY,	color)
      await background.write(saveBackground)
      console.log(`Icon background ${backgroundName} created.`)
      if (xmlPath) {
        const data = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
  <background android:drawable="@mipmap/ic_launcher_background" />
  <foreground android:drawable="@mipmap/ic_launcher_foreground" />
</adaptive-icon>`.trim()

        fs.writeFile(xmlPath, data, 'utf8', (err) => {
          if (err) throw err
          console.log(`XML file ${xmlPath} created!`)
        })
        }
      }

    const iconResized = await icon.resize(sizeX, sizeY)
    await iconResized.write(saveIcon)
    console.log(`Icon foreground ${iconName} created.`)

  } catch (error) {
    console.error(error)
  }
}

const askForImages = (() => {
  inquirer.prompt([
      {
        type: 'list',
        name: 'PLATFORM',
        message: 'For which platforms do you want to generate the Icons and Splash Screens ?',
        choices: platforms
      },
  ]).then(answers => {
    userAnswers.push(answers.PLATFORM)
    askIfSameFile()
  }).catch(err => err)
})

const askIfSameFile = (() => {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'SAME_FILE',
      message: 'Will you use the SAME FILE for the Icons and Splash Screens ?',
      default: true
    }
  ]).then(answer => {
    userAnswers.push(answer.SAME_FILE)
    askForFileName()
  }).catch(err => console.log(err))
})

const askForFileName = (() => {
  if(userAnswers[1] === false) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'LOGO_IMAGE',
        message: 'Please provide the filename of the logo for the Splash Screen (recommended size 1024 x 1024 or bigger | PNG format). E.g.: logo',
        default: 'logo'
      },
      {
        type: 'input',
        name: 'ICON_IMAGE',
        message: 'Please provide the filename of the icon for the icons (recommended size 256 x 256 or bigger | PNG format). E.g.: icon',
        default: 'icon'
      }
    ]).then(answer => {
      userAnswers.push(answer.LOGO_IMAGE + '.png')
      userAnswers.push(answer.ICON_IMAGE + '.png')
      askForColor()
    }).catch(err => err)

  } else {

    inquirer.prompt([
      {
        type: 'input',
        name: 'LOGO_IMAGE',
        message: 'Please provide the filename of the IMAGE you want (recommended size 1024 x 1024 or bigger | PNG format). E.g.: logo',
        default: 'logo'
      }
    ]).then(answer => {
      userAnswers.push(answer.LOGO_IMAGE + '.png')
      userAnswers.push(answer.LOGO_IMAGE + '.png')
      askForColor()
    }).catch(err => err)
  }
})

const askForColor = (() => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'USER_COLOR',
      message: 'Please select the color for the background of the splash screens and icons:',
      choices: colors
    }
  ]).then(answer => {
    if (answer.USER_COLOR === 'Custom') {
      askForCustomColor()
    } else {
      const start = answer.USER_COLOR.indexOf('(')
      const end = answer.USER_COLOR.indexOf(')')
      const codeColor = answer.USER_COLOR.substring(start + 1, end)
      userAnswers.push(codeColor)
      startProcess()
    }
  }).catch(err => err)
})

const askForCustomColor = (() => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'CUSTOM_COLOR',
      message: 'Please, provide the code of the color you want (E.g.: ff2233)',
      default: '#ffffff'
    }
  ]).then(answer => {
    userAnswers.push(answer.CUSTOM_COLOR)
    startProcess()
  }).catch(err => err)
})

const startProcess = (() => {
  iosLogo = userAnswers[3]
  logoSource = userAnswers[2]
  iconSource = userAnswers[3]
  setColor = userAnswers[4]
  if (userAnswers[0] === platforms[0]) {
    generateAll(logosData, iconsData, iosSplashData, iosIcons)
  } else if (userAnswers[0] === platforms[1]) {
    generateAndroid(logosData, iconsData)
  } else {
    generateIOS(iosSplashData, iosIcons)
  }
})

// CALL FOR GENERATE FUNCTIONS
const generateAll =  async function() {
  try {
    await startLogoCreation(logosData)
    await startIconCreation(iconsData)
    await startLogoCreation(iosSplashData)
    await startIosIconCreation(iosIcons)
  } catch (err) {
    return console.error(err)
  }
}

const generateAndroid = async function() {
  try {
    await startLogoCreation(logosData)
    await startIconCreation(iconsData)
  } catch (err) {
    return console.error(err)
  }
}

const generateIOS = async function() {
  try {
    // await startLogoCreation(iosSplashData)
    await startIosIconCreation(iosIcons)
  } catch (err) {
    return console.error(err)
  }
}

// Will start the process by asking for the user choices
askForImages()