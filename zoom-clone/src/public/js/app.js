const socket = io();
// front-end에서 back-end로 SocketIO 연결!
// io()는 알아서 SocketIO를 실행하고 있는 서버를 찾는다.

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
let roomName;

room.hidden = true;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();

  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_msg_send", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();

  const input = room.querySelector("#nickname input");
  socket.emit("nickname", input.value);
}

function showRoom(nickname, userCount) {
  welcome.hidden = true;
  room.hidden = false;

  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${userCount})`;

  const msgForm = room.querySelector("#msg");
  const nicknameForm = room.querySelector("#nickname");
  const nicknameInput = nicknameForm.querySelector("input");
  nicknameInput.value = nickname;

  msgForm.addEventListener("submit", handleMessageSubmit);
  nicknameForm.addEventListener("submit", handleNicknameSubmit);
}

function handelRoomSubmit(event) {
  event.preventDefault();

  const nicknameInput = form.querySelector("#nickname");
  const roomNameInput = form.querySelector("#roomName");
  socket.emit("enter_room", nicknameInput.value, roomNameInput.value, showRoom);
  // 1. 특정한 이름의 event를 emit한다. (어떤 이름이든 다 가능, 여기서는 enter_room.)
  // 2. javascript object를 전달할 수 있다. (전처럼 무조건 string이어야 하지 않음.)
  // 3. 서버에서 호출하는 callback 함수를 전달할 수 있다.

  roomName = roomNameInput.value;
  nicknameInput.value = "";
  roomNameInput.value = "";
}

form.addEventListener("submit", handelRoomSubmit);

socket.on("welcome", (user, userCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${userCount})`;

  addMessage(`${user} joined!`);
});

socket.on("bye", (user, userCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${userCount})`;

  addMessage(`${user} left.`);
});

socket.on("new_msg_receive", (msg) => {
  addMessage(msg);
});

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }

  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.appendChild(li);
  });
}); 






/* WebSocket Code
const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);
// front-end가 가지고 있는 socket
// 이 socket으로 backend와 메세지를 주고받을 수 있다.

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});


const handleNNSubmit = (event) => {
  event.preventDefault();

  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
};

const handleMsgSubmit = (event) => {
  event.preventDefault();

  const input = messageForm.querySelector("input");
  socket.send(makeMessage("chat", input.value));
  input.value = "";
};

nicknameForm.addEventListener("submit", handleNNSubmit);
messageForm.addEventListener("submit", handleMsgSubmit);

*/