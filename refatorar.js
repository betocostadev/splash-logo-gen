
// mkdirp('./imagens')



let background = new Jimp(1024, 1024, '#FFF000', function (err, image) {
  if (err) throw err;
});
background.write('background.png', (err) => {
    if (err) throw err;
});

let logo = new Jimp(250, 250, '#FFF', function (err, image) {
	if (err) throw err;
  });

logo.write('logo.png', (err) => {
    if (err) throw err;
});












iosComFundo.map(icon => img(icon['name'], icon['tamanho'], icon['imgMode']))






function teste(){
	createBackGround(1024, 1024, '#0071c8')
	img(name, 1024, imgMode)
	joinImages(Background, logo)
}

