// Cargar la biblioteca TCP
net = require('net');

// Realizar un seguimiento de los clientes de chat
var clients = [];

// Inicie un servidor TCP
net.createServer((socket) =>{

  // Identificar este cliente
  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  // Pon este nuevo cliente en la lista
  clients.push(socket);

  // Envía un bonito mensaje de bienvenida y anuncia
  socket.write("Bienvenido " + socket.name + "\n");
  broadcast(socket.name + " Únete al chat\n", socket);

  // Handle incoming messages from clients.
  socket.on('data',  (data) =>{
    broadcast(socket.name + "> " + data, socket);
  });

  
   // Manejar los mensajes entrantes de los clientes.
  socket.on('end', () =>{
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " Dejó la conversación\n");
  });
  
  
  // Enviar un mensaje a todos los clientes
  function broadcast(message, sender) {
    clients.forEach( (client) => {
      // No quiero enviarlo al remitente
      if (client === sender) return;
      client.write(message);
    });
    
    // Registrarse en la salida del servidor también
    process.stdout.write(message)
  }

}).listen(5000);

// Ponga un mensaje amigable en la terminal del servidor.
console.log('Chat server ejecutándose en el puerto 5000: \x1b[32m%s\x1b[0m', 'online');