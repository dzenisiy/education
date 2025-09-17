import {WebSocketServer} from "ws";

const wss = new WebSocketServer({port: 3000});

wss.on("connection", () => {
  wss.on("close", () => {
    console.log("socket disconnected");
  });
  console.log("new socket connected");
});


console.log("chat server waiting for connections on ws://localhost:3000")
