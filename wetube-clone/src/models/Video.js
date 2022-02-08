import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  metaData: {
    views: Number,
    rating: Number,
  },
});
// 먼저, 데이터의 형식(스키마)을 정의한다. 

const Video = mongoose.model("Video", videoSchema);
// 위에 만들어 둔 스키마를 가지고 model을 만든다. (모델 이름, 스키마) 전달해 주기.

export default Video;