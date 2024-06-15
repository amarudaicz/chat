const WebSocket = require('websocket');
const {createServer} = require('node:http')

const server = createServer(function(request, response) {
    response.writeHead(404);
    response.end();
});


const wss = new WebSocket.server({httpServer:server, autoAcceptConnections:true});
const clients = new Set();
 
wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");
  clients.add(ws);

  ws.on("message", (message) => {
    console.log(`Recibido: ${message}`);

    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

console.log('SERVER READY', wss);

const PORT = process.env.PORT || 3000
server.listen(PORT, function() {
    console.log((new Date()) + ' Server is listening on ', PORT);
});
