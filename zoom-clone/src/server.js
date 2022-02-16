import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("✅ Listening on : http://localhost:3000");

const httpServer = http.createServer(app);
// express application을 이용해서 http 서버를 만든다.

const wsServer = new WebSocketServer({ server: httpServer });
// http 서버 위에 ws 서버를 만든다.
// 항상 http 서버를 전달해야 하는 것은 아님. ws 서버만 만들 수도 있다.
// http 서버를 전달하면 동일한 포트에서 http, ws request 두 개를 다 처리할 수 있다.

const sockets = [];

wsServer.on("connection", (socket) => {
  socket["nickname"] = "익명";
  sockets.push(socket);
  console.log("Connected to Browser ✅");

  socket.on("close", () => {
    console.log("Disconnected from Browser ❌");
  });

  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "chat":
        sockets.forEach((aSocket) => 
          aSocket.send(`${socket.nickname}: ${message.payload}`));
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break; 
    } 
  });
});
// "on" method의 callback : backend에 연결된 사람의 정보(socket)를 제공해 준다. 

httpServer.listen(3000, handleListen);