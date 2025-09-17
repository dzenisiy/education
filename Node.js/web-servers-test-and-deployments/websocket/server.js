import {WebSocketServer} from "ws";

const wss = new WebSocketServer({port: 3000});

let messsages = [];

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(message.toString());
    messsages.push(message.toString());
    if (message.toString().toLowerCase() === "exit") {
      ws.close();
    } else {
      wss.clients.forEach(client => client.send(message.toString()))
    }
  })
  ws.on("close", () => {
    console.log("socket disconnected");
  });
  console.log("new socket connected");
  ws.send("Welcome to live chat");

  if (messsages.length) {
    ws.send("Chat currently in session");
    messsages.forEach((message) => {
      ws.send(message.toString());
    })
  }
});


console.log("chat server waiting for connections on ws://localhost:3000")
