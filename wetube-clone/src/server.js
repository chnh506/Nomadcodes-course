import express from "express"; 

const PORT = 4000;

const app = express();   
// express function을 사용하면, express application을 생성한다.

const handelListening = () => 
  console.log(`Server Listening on "http://localhost:${PORT}" 🚀`); 
// app.listen()에 제공할 콜백 함수

app.listen(PORT, handelListening);
// 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 한다.
// 포트 번호, 콜백함수를 인자로 제공해 줘야 한다. (고차함수와 콜백함수 : 모던 JS 참고.)