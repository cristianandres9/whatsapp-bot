const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Cliente corriendo!');
});

client.on('message', message => {
	console.log(message.body);
});

client.on('message', message => {
    console.log(message.body);
	if(message.body === 'Hola') {
		message.reply('Hola respuesta de prueba de bot-whatsapp');
	}
});

client.initialize();