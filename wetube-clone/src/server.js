import express from "express"; 
import morgan  from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";


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

app.use(express.json());
// string을 받아서 json으로 바꿔주는 미들웨어. 
// express에게 json을 보내고 있다고 알려주는  설정이 추가적으로 필요하다.(front-end에서 진행)

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  // session을 수정할 때만 세션을 DB에 저장하고 브라우저에게 쿠키를 넘겨준다.
  store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  // MongoStore를 이용해 세션을 MongoDB에 저장하도록 설정.
}));
// session 미들웨어(from express-session)은 router들 앞에 추가해줘야 한다.
// secret은 말 그대로 아무도 모르는 문자열로 설정해줘야 한다. 나머지는 deprecated에 대한 처리.
// 이 미들웨어가 있으면 express가 알아서 그 브라우저를 위한 세션ID를 만들고 브라우저한테 보낸다.

app.use(flash());
// express-flash를 사용한다.

app.use(localsMiddleware);
// View Engine(이 프로젝트에서는 pug에 해당)에 전역 변수를 전달하기 위한 미들웨어.
// 세션 미들웨어 뒤에 있어야 세션 Object를 활용할 수 있다. 순서 중요!

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
// 만약 누군가가 /uploads 경로로 가려고 하면, uploads 폴더의 내용을 보여주라고 브라우저에게 알려주는 것!
// 서버는 uploads, assets 폴더를 공개한다!

app.use("/convert", express.static("node_modules/@ffmpeg/core/dist"));
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
// 누군가가 "/videos"로 시작하는 url에 접근하면, Express는 videoRouter에 있는 컨트롤러에 접근한다.
app.use("/api", apiRouter);
// api는 백엔드가 템플릿을 렌더링하지 않을 때 front-end와 back-end가 통신하는 방법을 말한다. 


export default app;