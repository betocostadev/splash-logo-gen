const Jimp = require('jimp');

/**
 * tamanhoLogoY:
 * tamanhoLogoX:
 * imgMode:        Molde do logo
 * hasBackground:  Precisa de um background (fundo trasparente)
 * backgroundImg:  Nome da imagem de fundo ou cor
 * backgroundImgY: Altura da imagem de background
 * backgroundImgX: Largura da imagem de background
 * pathSave:       Local onde salvar a imagem
 */

const backgroundImg = "#fff"
const logocomFundo = 'logo.png'

const iosComFundo = [
	{
		tamanhoLogoY: 57,
		tamanhoLogoX: 57,
		imgMode: logocomFundo,
		hasBackground: true,
		backgroundImg:backgroundImg,
		backgroundImgY:57,
		backgroundImgX:57,
		pathSave: 'caminho/icon.png'
	},
	{ tamanhoLogoY: 114,tamanhoLogoX: 114,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:114,backgroundImgX:114,pathSave: 'caminho/icon@2x.png' },
	{ tamanhoLogoY: 40,tamanhoLogoX: 40,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:40,backgroundImgX:40,pathSave: 'caminho/icon-20@2x.png' },
	{ tamanhoLogoY: 60,tamanhoLogoX: 60,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:60,backgroundImgX:60,pathSave: 'caminho/icon-20@3x.png' },
	{ tamanhoLogoY: 48,tamanhoLogoX: 48,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:48,backgroundImgX:48,pathSave: 'caminho/icon-24@2x.png' },
	{ tamanhoLogoY: 48,tamanhoLogoX: 48,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:48,backgroundImgX:48,pathSave: 'caminho/icon-27.5@2x.png' },
	{ tamanhoLogoY: 55,tamanhoLogoX: 55,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:55,backgroundImgX:55,pathSave: 'caminho/icon-27.png' },
	{ tamanhoLogoY: 29,tamanhoLogoX: 29,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:29,backgroundImgX:29,pathSave: 'caminho/icon-29.png' },
	{ tamanhoLogoY: 58,tamanhoLogoX: 58,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:58,backgroundImgX:58,pathSave: 'caminho/icon-29@2x.png' },
	{ tamanhoLogoY: 87,tamanhoLogoX: 87,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:87,backgroundImgX:87,pathSave: 'caminho/icon-29@3x.png' },
	{ tamanhoLogoY: 88,tamanhoLogoX: 88,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:88,backgroundImgX:88,pathSave: 'caminho/icon-44@2x.png' },
	{ tamanhoLogoY: 72,tamanhoLogoX: 72,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:72,backgroundImgX:72,pathSave: 'caminho/icon-72.png' },
	{ tamanhoLogoY: 144,tamanhoLogoX: 144,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:144,backgroundImgX:144,pathSave: 'caminho/icon-72@2x.png' },
	{ tamanhoLogoY: 76,tamanhoLogoX: 76,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:76,backgroundImgX:76,pathSave: 'caminho/icon-76.png' },
	{ tamanhoLogoY: 172,tamanhoLogoX: 172,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:172,backgroundImgX:172,pathSave: 'caminho/icon-86@2x.png' },
	{ tamanhoLogoY: 196,tamanhoLogoX: 196,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:196,backgroundImgX:196,pathSave: 'caminho/icon-98@2x.png' },
	{ tamanhoLogoY: 1024,tamanhoLogoX: 1024,imgMode: logocomFundo,hasBackground: true,backgroundImg:backgroundImg,backgroundImgY:1024,backgroundImgX:1024,pathSave: 'caminho/icon-1024.png' },
]

iosComFundo.map(foto => {
	// verifico se ele precisa de um background
	if(foto.hasBackground) {
		// verificar se ele tem uma img de background padrao
		if(/^[a-zA-Z0-9-_\.]+\.(jpg|gif|png)$/.test(foto.backgroundImg)) {
			// Arruma o tamanho do backgraund
			Jimp.read(foto.backgroundImg)
			.then(img1 => {
				// img1.invert()
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
			// crio uma imagem de background com a cor passada como parametro
			new Jimp(foto.backgroundImgY, foto.backgroundImgX, foto.backgroundImg,  (err, image) => {
				Jimp.read(foto.imgMode)
				.then(img => {
					img.resize(foto.tamanhoLogoY, foto.tamanhoLogoX)
					image.composite(img, 0,0)
					.write(foto.pathSave)
				})
			})
		}
	} else {
		Jimp.resize(imgMode)
		.then(img => {
			img.resize(foto.tamanhoLogoX, foto.tamanhoLogoY)
			.write(foto.pathSave)
		})
	}
})


// crio uma imagem de background com uma cor  e tamanho passado
const createBackGround = ((backgroundImgY, backgroundImgX, backgroundImg, path) => {
	new Jimp(backgroundImgX, backgroundImgY, backgroundImg, ((err, image) => {
		if (err) console.log(err)
		image.write(path, (err) => {
			if(err) {
				console.log(err)
			} else {
				return path
			}
		})
	}))
})

//redimencionamento de uma imagem passada
const resizeImg = ((img, tamanhoLogoX, tamanhoLogoY, path) => {
	Jimp.read(img)
	.then(img => {
		return img
		.resize(tamanhoLogoX, tamanhoLogoY) // resize
		.write(path) // save
	})
	.catch(err => {
		console.error(err)
	})
})

// const invertImg = ((img, tamanhoLogoX, tamanhoLogoY, path) => {
// 	Jimp.read(img)
// 	.then(img => {
// 		return img
// 		.invert() // resize
// 		.write(path) // save
// 	})
// 	.catch(err => {
// 		console.error(err)
// 	})
// })

//junto duas imagens sendo uma de backgrund e a outro sendo o logo
const joinImg = ((img1,img2, mx, my, path) => {
	const imagens = [img1,img2]
	jimps = imagens.map(e => Jimp.read(e))
	Promise.all(jimps).then(function(data) {
		return Promise.all(jimps)
	}).then(function(data) {
		data[0].composite(data[1], mx, my)
		data[0].write(path, function(){})
	}).catch(e => {
		console.log(e)
	})
})
