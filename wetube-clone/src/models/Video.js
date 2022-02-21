import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  // Date.now 뒤에 '()' 붙이면 함수가 즉시 실행된다. 안 붙이면 mongoose가 알아서 해줌.
  hashtags: [{ type: String, trim: true }],
  metaData: {
    views: { type: Number, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});
// 먼저, 데이터의 형식(스키마)을 정의한다. 

videoSchema.static('formatHashtags', function(hashtags) {
  return hashtags
    .split(",")
    .map((word) =>
      word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`);
});
// static 함수를 만든다. (즉, Video.formatHashtags() 함수를 만든다.)

const Video = mongoose.model("Video", videoSchema);
// 위에 만들어 둔 스키마를 가지고 model을 만든다. (모델 이름, 스키마) 전달해 주기.


export default Video;