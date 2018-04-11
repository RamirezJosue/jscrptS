
// ====================================================
// Servidor
// ====================================================
var net = require('net');

var server = net.createServer((socket) =>{
    socket.write('Echo server\r\n');
    socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');

// ====================================================
// Cliente
// ====================================================
var net = require('net');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', () =>{
    console.log('Connected');
    client.write('Hola soy Josue');
});

client.on('data', (data) =>{
    console.log('Received: ' + data);
    client.destroy(); // mata al cleinte despues de la respuesta del servirdor
});

client.on('close', () =>{
    console.log('Connection closed');
});