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