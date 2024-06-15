const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });
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

