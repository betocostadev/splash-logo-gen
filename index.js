const fs = require('fs')
const chalk = require('chalk')
const Jimp = require('jimp')
const inquirer = require('inquirer')

const platforms = [ '1. All', '2. Android', '3. iOS' ]
const colors = [ 'White (#ffffff)', 'Black (#000000)', 'Transparent (#ffffff00)', 'Custom' ]
const userAnswers = []

const iosIcons = JSON.parse(fs.readFileSync('./data-sources/iosIcons.json'))
const iosSplashData = JSON.parse(fs.readFileSync('./data-sources/iosSplash.json'))
const logosData = JSON.parse(fs.readFileSync('./data-sources/logos.json'))
const iconsData = JSON.parse(fs.readFileSync('./data-sources/icons.json'))
const faviconsData = JSON.parse(fs.readFileSync('./data-sources/favicons.json'))

let iosLogo, logoSource, iconSource, setColor

// Welcome message
console.log(chalk.blue.bold(`
    Welcome to SplashLogoGen!
    `))



function createBackground(sizeX, sizeY, color) {
  return new Promise((resolve, reject) => {
      new Jimp(sizeX, sizeY, color,  (err, image) => {
          if(err) return reject(err)
          return resolve(image)
      })
  })
}

const startFaviconCreation = async function(dataSource) {
  try {
    console.log(chalk.green.bold('Favicons for all platforms will be generated...'))
    dataSource.map(icon => {
      createFavicons(icon)
    })
  } catch (error) {
    console.error(error)
  }
}

const startLogoCreation = async function(dataSource) {
  try {
    dataSource[0].name.includes('1024')
    ? console.log(chalk.green.bold('Android Splash screens will be generated...'))
    : console.log(chalk.green.bold('iOS Splash screens will be generated...'))

    dataSource.map(logo => {
      createLogos(logo)
    })
  } catch (error) {
    console.error(error)
  }
}

const startIconCreation = async function(dataSource) {
  try {
    console.log(chalk.green.bold('Android icons will be generated...'))
    dataSource.map(icon => {
      createIcons(icon)
    })
  } catch (error) {
    console.error(error)
  }
}

const startIosIconCreation = async function(dataSource) {
  try {
    console.log(chalk.green.bold('iOS icons will be generated...'))
    dataSource.map(icon => {
      createIosIcons(icon)
    })
  } catch (error) {
    console.error(error)
  }
}

// Create functions
async function createFavicons({ sizeX, sizeY, save }) {
  // SERÁ GERADO O FAVICON SOURCE DE ACORDO COM AS RESPOSTAS DO USUÁRIO COMO NAS OUTRAS FUNÇÕES!
  const icon = await Jimp.read(faviconSource)
  try {
    icon.resize(sizeX, sizeY).write(save)
    console.log(save)
  } catch (error) {
    console.log(error)
  }
}


async function createLogos({ name, backgroundSizeX, backgroundSizeY,	color,	logoSizeX, logoSizeY,	blitX,	blitY, save}) {

  color = setColor
  const logo = await Jimp.read(logoSource)
  try {
    const background = await createBackground(backgroundSizeX, backgroundSizeY,	color)
    // call to blit function - Blit is used to change the position of the logo in relation to the background
    const logoResized = logo.resize(logoSizeX, logoSizeY)
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
      const iconResized = icon.resize(iconSizeX, iconSizeY)
      background.composite(iconResized, 0, 0)
      // write image
      .write(savePath)
      console.log(`iOS icon: ${savePath} created.`)
    } else {
      const iconResized = icon.resize(iconSizeX, iconSizeY)
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

    const iconResized = icon.resize(sizeX, sizeY)
    iconResized.write(saveIcon)
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
  faviconSource = 'favicon.png'
  if (userAnswers[0] === platforms[0]) {
    generateAll(logosData, iconsData, iosSplashData, iosIcons, faviconSource)
  } else if (userAnswers[0] === platforms[1]) {
    generateAndroid(logosData, iconsData)
  } else {
    generateIOS(iosSplashData, iosIcons)
  }
})

// CALL FOR GENERATE FUNCTIONS
const generateAll =  async function() {
  try {
    // await startLogoCreation(logosData)
    // await startIconCreation(iconsData)
    // await startLogoCreation(iosSplashData)
    // await startIosIconCreation(iosIcons)
    await startFaviconCreation(faviconsData)
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

// Will start the process by asking for the user choices
askForImages()