const WebSocket = require('ws');

const PORT = process.env.PORT || 3000

const wss = new WebSocket.Server({
  port: PORT,
});

const clients = new Set();
 
wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");
  clients.add(ws);

  ws.on('message', message => {
    const data = JSON.parse(message);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ username: data.username, message: data.message }));
      }
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

console.log('SERVER READY', wss);
