import express from "express"; 
import morgan  from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express(); 
// express function을 사용하면, express application을 생성한다.

app.set("view engine", "pug"); 
// express application의 view engine을 pug로 설정한다.  
app.set("views",  process.cwd() + "/src/views");
// view 추가설정

const logger = morgan("dev");
app.use(logger);
// external middleware인 morgan을 npm으로 다운받아 사용한다.

app.use(express.urlencoded({ extended: true }));
// express application이 form의 value를 이해할 수 있도록 하고, 
// 우리가 쓸 수 있는 자바스크립트 형식으로 변환시켜 준다.

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
// 누군가가 "/videos"로 시작하는 url에 접근하면, Express는 videoRouter에 있는 컨트롤러에 접근한다.


export default app;