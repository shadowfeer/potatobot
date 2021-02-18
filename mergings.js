var jimp = require('jimp');

async function doMerge(receivedMessage, img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, name) {
    var IMG_PATH = "C:\\Users\\Lipe2\\OneDrive\\Documentos\\GitHub\\potatobot\\images\\";

    //an array of all images we're using. MAKE SURE THEIR SIZES MATCH
    var images = [IMG_PATH + img0, IMG_PATH + img1.img, IMG_PATH + img2.img, IMG_PATH + img3.img, IMG_PATH + img4.img, IMG_PATH + img5.img, IMG_PATH + img6.img, IMG_PATH + img7.img, IMG_PATH + img8.img, IMG_PATH + img9.img]

    var jimps = []

    //turns the images into readable variables for jimp, then pushes them into a new array
    for (var i = 0; i < images.length; i++){
        jimps.push(jimp.read(images[i]))
    }

    //creates a promise to handle the jimps
    await Promise.all(jimps).then(function(data) {
        return Promise.all(jimps)
    }).then(async function(data){
        // --- THIS IS WHERE YOU MODIFY THE IMAGES --- \\
        data[0].composite(data[1], img1.posx, img1.posy)
        data[0].composite(data[2], img2.posx, img2.posy)
        data[0].composite(data[3], img3.posx, img3.posy)
        data[0].composite(data[4], img4.posx, img4.posy)
        data[0].composite(data[5], img5.posx, img5.posy)
        data[0].composite(data[6], img6.posx, img6.posy)
        data[0].composite(data[7], img7.posx, img7.posy)
        data[0].composite(data[8], img8.posx, img8.posy)
        data[0].composite(data[9], img9.posx, img9.posy)

        //this saves our modified image
        data[0].write(IMG_PATH + name)

        
        //.then(console.log)
    }).catch(err => {
        console.log('Erro ao carregar a imagem')
    });
    const p = new Promise((resolve, reject) =>{
        setTimeout(() => resolve('yay'), 10)
    })

    return p

}

/*async function doMerge2(receivedMessage, img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, name) {
    var IMG_PATH = "C:\\Users\\Lipe2\\OneDrive\\Desktop\\mybot\\images\\";

    //an array of all images we're using. MAKE SURE THEIR SIZES MATCH
    var images = [IMG_PATH + img0, IMG_PATH + img1.img, IMG_PATH + img2.img, IMG_PATH + img3.img, IMG_PATH + img4.img, IMG_PATH + img5.img, IMG_PATH + img6.img, IMG_PATH + img7.img, IMG_PATH + img8.img, IMG_PATH + img9.img]

    var jimps = []

    //turns the images into readable variables for jimp, then pushes them into a new array
    for (var i = 0; i < images.length; i++){
        jimps.push(jimp.read(images[i]))
    }

    //creates a promise to handle the jimps
    await Promise.all(jimps).then(function(data) {
        return Promise.all(jimps)
    }).then(async function(data){
        // --- THIS IS WHERE YOU MODIFY THE IMAGES --- \\
        data[0].composite(data[1], img1.posx, img1.posy)
        data[0].composite(data[2], img2.posx, img2.posy)
        data[0].composite(data[3], img3.posx, img3.posy)
        data[0].composite(data[4], img4.posx, img4.posy)
        data[0].composite(data[5], img5.posx, img5.posy)
        data[0].composite(data[6], img6.posx, img6.posy)
        data[0].composite(data[7], img7.posx, img7.posy)
        data[0].composite(data[8], img8.posx, img8.posy)
        data[0].composite(data[9], img9.posx, img9.posy)

        //this saves our modified image
        data[0].write(IMG_PATH + name)

        
        //.then(console.log)
    }).catch(err => {
        console.log('Erro ao carregar a imagem')
    });
    const p = new Promise((resolve, reject) =>{
        setTimeout(() => resolve('yay'), 10)
    })

    return p

}*/

module.exports = { doMerge }
