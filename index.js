const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    listenMessage();
});

//funcion que escucha los mensajes
const listenMessage = () => {
    client.on('message', (msg) => {
        const {from, to, body} = msg;

        //Preguntas frecuentes
        switch(body){
            case 'Hola':
                sendMessage (from, 'Bienvenidos al baul de rosa, escribe Ver productos o Ver promociones para continuar')
                break;
            case 'Productos':
                sendMessage (from, 'Productos de cositas deliciosas y leche pal pelo, si quieres verlas envia Ver productos')
                break;
            case 'Promociones':
                sendMessage (from, '20% de descuento compras superiores a $100.000, si quieres verlas envia Ver promociones')
                break;
            case 'Ver promociones':
                sendMessage(from,'Estas son nuestras promociones del dia de hoy')
                sendMedia(from,'promocion-1.jpg')
                sendMedia(from,'promocion-2.jpg')
                break;
            case 'Ver productos':
                sendMessage(from,'Estas son todos nuestros productos')
                sendMedia(from,'alisado-progresivo-260ml.jpg')
                sendMedia(from,'shampoo-magico-525ml.jpg')
                sendMedia(from,'logo.jpg')
                break;
        }

        console.log(from, to, body);
    })
}

//funcion enviar archivos multimedia
const sendMedia = (to, file) => {
    const mediaFile = MessageMedia.fromFilePath(`./media/${file}`)
    client.sendMessage(to, mediaFile)
}

//funcion envia mensaje
const sendMessage = (to, messagge) => {
    client.sendMessage(to, messagge)
}


client.initialize();
