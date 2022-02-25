import "dotenv/config";
// dotenv는 내 프로젝트에서 가장 앞에 import해 줘야 한다.
import "./db";        
// 파일 자체를 import해 준다. 이 파일을 임포트해 줌으로써, 내 서버가 mongo에 연결된다.
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 4000;

const handelListening = () => 
  console.log(`✅ Server Listening on "http://localhost:${PORT}" 🚀`); 
// app.listen()에 제공할 콜백 함수

app.listen(PORT, handelListening);
// 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 한다.
// 포트 번호, 콜백함수를 인자로 제공해 줘야 한다. (고차함수와 콜백함수 : 모던 JS 참고.)