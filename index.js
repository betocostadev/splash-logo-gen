const fs = require('fs')
const cliSelect = require('cli-select')
const chalk = require('chalk');
const Jimp = require('jimp')

const backgroundImg = "#fff"
const iosLogo = 'logo.png'
const logoSource = 'logo.png'
const iconSource = 'icon.png'
const colors = [
  { name: 'white', code: '#ffffff' },
  { name: 'transparent', code: '#ffffff00' }
]
const setColor = colors[0].code

// ARRAYS WITH ICONS AND LOGOS DATA FOR ALL PLATFORMS:
const iosIcons = [
	{
		tamanhoLogoY: 57,
		tamanhoLogoX: 57,
		imgMode: iosLogo,
		hasBackground: true,
		backgroundImg: backgroundImg,
		backgroundImgY: 57,
		backgroundImgX: 57,
		pathSave: 'dist/ios/icons/icon.png'
	},
	{
    tamanhoLogoY: 114,
    tamanhoLogoX: 114,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg: backgroundImg,
    backgroundImgY: 114,
    backgroundImgX: 114,
    pathSave: 'dist/ios/icons/icon@2x.png'
  },
	{
    tamanhoLogoY: 40,
    tamanhoLogoX: 40,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg: backgroundImg,
    backgroundImgY: 40,
    backgroundImgX: 40,
    pathSave: 'dist/ios/icons/icon-20@2x.png'
  },
  {
    tamanhoLogoY: 60,
    tamanhoLogoX: 60,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg: backgroundImg,
    backgroundImgY: 60,
    backgroundImgX: 60,
    pathSave: 'dist/ios/icons/icon-20@3x.png'
  },
  {
    tamanhoLogoY: 48,
    tamanhoLogoX: 48,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg:backgroundImg,
    backgroundImgY:48,
    backgroundImgX:48,
    pathSave: 'dist/ios/icons/icon-24@2x.png'
  },
	{
    tamanhoLogoY: 48,
    tamanhoLogoX: 48,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg:backgroundImg,
    backgroundImgY:48,
    backgroundImgX:48,
    pathSave: 'dist/ios/icons/icon-27.5@2x.png'
  },
	{
    tamanhoLogoY: 55,
    tamanhoLogoX: 55,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg: backgroundImg,
    backgroundImgY: 55,
    backgroundImgX: 55,
    pathSave: 'dist/ios/icons/icon-27.png'
  },
	{
    tamanhoLogoY: 29,
    tamanhoLogoX: 29,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg: backgroundImg,
    backgroundImgY: 29,
    backgroundImgX: 29,
    pathSave: 'dist/ios/icons/icon-29.png'
  },
	{
    tamanhoLogoY: 58,
    tamanhoLogoX: 58,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg:backgroundImg,
    backgroundImgY:58,
    backgroundImgX:58,
    pathSave: 'dist/ios/icons/icon-29@2x.png'
  },
	{
    tamanhoLogoY: 87,
    tamanhoLogoX: 87,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg: backgroundImg,
    backgroundImgY: 87,
    backgroundImgX: 87,
    pathSave: 'dist/ios/icons/icon-29@3x.png'
  },
	{
    tamanhoLogoY: 88,
    tamanhoLogoX: 88,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg:backgroundImg,
    backgroundImgY:88,
    backgroundImgX:88,
    pathSave: 'dist/ios/icons/icon-44@2x.png'
  },
	{
    tamanhoLogoY: 72,
    tamanhoLogoX: 72,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg:backgroundImg,
    backgroundImgY:72,
    backgroundImgX:72,
    pathSave: 'dist/ios/icons/icon-72.png'
  },
	{
    tamanhoLogoY: 144,
    tamanhoLogoX: 144,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg:backgroundImg,
    backgroundImgY:144,
    backgroundImgX:144,
    pathSave: 'dist/ios/icons/icon-72@2x.png'
  },
	{
    tamanhoLogoY: 76,
    tamanhoLogoX: 76,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg:backgroundImg,
    backgroundImgY:76,
    backgroundImgX:76,
    pathSave: 'dist/ios/icons/icon-76.png'
  },
	{
    tamanhoLogoY: 172,
    tamanhoLogoX: 172,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg:backgroundImg,
    backgroundImgY:172,
    backgroundImgX:172,
    pathSave: 'dist/ios/icons/icon-86@2x.png'
  },
	{
    tamanhoLogoY: 196,
    tamanhoLogoX: 196,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg:backgroundImg,
    backgroundImgY:196,
    backgroundImgX:196,
    pathSave: 'dist/ios/icons/icon-98@2x.png'
  },
	{
    tamanhoLogoY: 1024,
    tamanhoLogoX: 1024,
    imgMode: iosLogo,
    hasBackground: true,
    backgroundImg:backgroundImg,
    backgroundImgY:1024,
    backgroundImgX:1024,
    pathSave: 'dist/ios/icons/icon-1024.png'
  },
]

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



function createBackground(sizeX, sizeY, color){
  return new Promise((resolve, reject) => {
      new Jimp(sizeX, sizeY, color,  (err, image) => {
          if(err)  return reject(err)
          return resolve(image)
      })
  })
}

const startLogoCreation = async function(dataSource) {
  try {
    console.log(chalk.green.bold(`
      Process started. Will generate images...
      `))

    dataSource.map(foto => {
      createLogos(foto)
    })

  } catch (error) {
    console.error(error)
  }
}

const startIconCreation = async function(dataSource) {
  try {
    console.log(chalk.green.bold(`
      Icon creation started. Will generate icons...
      `))

    dataSource.map(icon => {
      createIcons(icon)
    })
  } catch (error) {
    console.error(error)
  }
}

// Create logos
async function createLogos({ name, backgroundSizeX, backgroundSizeY,	color,	logoSizeX, logoSizeY,	blitX,	blitY, save}) {
  const logo = await Jimp.read(logoSource)
  try {
    const background = await createBackground(backgroundSizeX, backgroundSizeY,	color)
    // call to blit function
    // const backgroundResized = await background.resize(1024, 500)
    const logoResized = await logo.resize(logoSizeX, logoSizeY)
    // background.resize(1024, 500)
    background.blit(logoResized, blitX, blitY)
    // write image
		.write(save)
		console.log(`Image: ${name} created!`)
  } catch (error) {
    console.error(error)
  }
}

async function createIcons({ iconName, backgroundName, sizeX, sizeY, color, xmlPath, saveIcon, saveBackground}) {
  const icon = await Jimp.read(iconSource)

  try {
    // Check if it needs a background
    if (backgroundName) {
      color = colors[0].code
      const background = await createBackground(sizeX, sizeY,	color)
      await background.write(saveBackground)
      console.log(`Icon background ${backgroundName} created!`)
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
    console.log(`Icon foreground ${iconName} created!`)

  } catch (error) {
    console.error(error)
  }
}

const startIosIconCreation = arr => {
  if(/^[a-zA-Z0-9-_\.]+\.(jpg|gif|png)$/.test(backgroundImg)) console.log('ITS TRUE')
  console.log(chalk.green.bold(`
      Icon creation for iOS started. Will generate icons...
      `))
  arr.map(foto => {
    // verifico se ele precisa de um background
    if(foto.hasBackground) {
      // verificar se ele tem uma img de background padrao
      if(/^[a-zA-Z0-9-_\.]+\.(jpg|gif|png)$/.test(foto.backgroundImg)) {
        // Arruma o tamanho do background
        Jimp.read(foto.backgroundImg)
        .then(img1 => {
          img1.resize(foto.backgroundImgX, foto.backgroundImg) // resize
          Jimp.read(foto.imgMode)
          .then(img2 => {
            img2.resize(foto.tamanhoLogoY, foto.tamanhoLogoX)
            img1.composite(img2,0,0)
            .write(foto.pathSave, e => {console.log('foi')})
          })
          .catch(erro => console.log(erro))
        .catch(erro => console.log(erro))
        })
      } else {
        // crio uma imagem de background com a cor passada como parâmetro
        new Jimp(foto.backgroundImgY, foto.backgroundImgX, foto.backgroundImg,  (err, image) => {
          Jimp.read(foto.imgMode)
          .then(img => {
            img.resize(foto.tamanhoLogoY, foto.tamanhoLogoX)
            image.composite(img, 0,0)
            .write(foto.pathSave)
          })
        })
        console.log(`Created ${foto.pathSave} icon!`)
      }
    } else {
      Jimp.resize(imgMode)
      .then(img => {
        img.resize(foto.tamanhoLogoX, foto.tamanhoLogoY)
        .write(foto.pathSave)
      })
    }
  })
}


(function welcome () {
  return console.log(chalk.blue.bold(`
    Welcome to SplashLogoGen!
    Please, select the icons and splash screens for the devices you want:
    `))
})()
// CLI Selections
cliSelect({
  values: [
    {
      message: '1. Generate icons and splash screens for all platforms.'
    },
    {
      message: '2. Generate Android icons and splash screens.'
    },
    {
      message: '3. Generate iOS icons and splash screens'
    },
    {
      message: '4. Exit'
    }
  ],
  valueRenderer: (value, selected) => {
      if (selected) {
          return chalk.green(value.message)
      }
      return value.message
  },
}).then(
    (value) => {
      value.id === 0 ?
      generateAll(logosData, iconsData, iosSplashData, iosIcons)
      : value.id === 1 ?
      generateAndroid(logosData, iconsData)
      : value.id === 2 ?
      generateIOS(iosSplashData, iosIcons)
      : console.log(chalk.green.bold('Program closed. No images were generated.'))
    }).catch((e) => {
      console.log(chalk.red('Program closed', e))
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
    await startLogoCreation(iosSplashData)
    await startIosIconCreation(iosIcons)
  } catch (err) {
    return console.error(err)
  }
}