import http from "http";
import { Server } from "socket.io";
// import WebSocket, { WebSocketServer } from "ws";
import { instrument } from "@socket.io/admin-ui";
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

const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});
// SocketIO를 이용해 서버를 만든다.
// SocketIO는 서버를 만들면 기본적으로 (http://localhost:3000/socket.io/socket.io.js) url을 유저에게 준다.
// SocketIO는 WebSocket처럼 브라우저에 기본적으로 존재하지 않으므로, 위 js 파일을 통해 front-end에 SocketIO를 설치하는 것이다.
// 추가적인 인수들은 admin panel을 위한 것! 문서 참고.

instrument(io, {
  auth: false,
});

function publicRooms() {
  const { 
    sockets: { 
      adapter: { sids, rooms } 
    } 
  } = io; 
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms; 
}

function userCount(roomName){
  const userCount = io.sockets.adapter.rooms.get(roomName)?.size;
  return userCount;
}

io.on("connection", (socket) => {
  io.sockets.emit("room_change", publicRooms());
  socket["nickname"] = "Anon";
  // socket 또한 객체. 객체의 nickname 프로퍼티를 생성한다. 

  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  // 모든 event에서 작동하는 미들웨어 같은 것.

  socket.on("enter_room", (nickname, roomName, showRoom) => {
    socket["nickname"] = nickname;
    socket.join(roomName);
    showRoom(nickname, userCount(roomName));
    socket.to(roomName).emit("welcome", socket.nickname, userCount(roomName));
    io.sockets.emit("room_change", publicRooms());
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => 
      socket.to(room).emit("bye", socket.nickname, userCount(room) - 1)
    );
  });

  socket.on("disconnect", () => {
    io.sockets.emit("room_change", publicRooms());
  });

  socket.on("new_msg_send", (msg, roomName, done) => {
    socket.to(roomName).emit("new_msg_receive", `${socket.nickname}: ${msg}`);
    done();
  });

  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});





/* WebSocket Code

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

*/


httpServer.listen(3000, handleListen);