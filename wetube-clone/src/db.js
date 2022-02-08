import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube-clone");
// mongoDB를 연결해 준다. (url 주소 : mongodb://127.0.0.1:27017/#{db 이름})

const db = mongoose.connection;
// mongoDB connection에 대한 정보를 db라는 변수로 저장.

db.on("error", (error) => console.log("❌ DB Error:", error));
// error라는 event가 발생할 때마다 콜백 함수를 실행한다. (on: 여러 번 가능)

db.once("open", () => console.log("✅ MongoDB connection success"));
// open이라는 event가 발생할 때 한 번만 실행한다. (once: 한 번만 가능)
