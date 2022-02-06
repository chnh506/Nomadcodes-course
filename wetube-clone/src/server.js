import express from "express"; 
import morgan  from "morgan";

const PORT = 4000;

const app = express();   
// express function을 사용하면, express application을 생성한다.

const logger = morgan("dev");
// external middleware인 morgan을 npm으로 다운받아 사용한다.

/*
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}
// middleware handler(controller). 몇 개든지 존재할 수 있다.
*/

const handleHome = (req, res) => {
  return res.end();
}
// app.get()에 제공할 콜백 함수

app.use(logger);
app.get("/", logger, handleHome);
// 누군가가 어떤 route(여기서는 root page, "/")로 get request를 보냈다면, 콜백 함수를 실행시킨다.

const handelListening = () => 
  console.log(`Server Listening on "http://localhost:${PORT}" 🚀`); 
// app.listen()에 제공할 콜백 함수

app.listen(PORT, handelListening);
// 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 한다.
// 포트 번호, 콜백함수를 인자로 제공해 줘야 한다. (고차함수와 콜백함수 : 모던 JS 참고.)