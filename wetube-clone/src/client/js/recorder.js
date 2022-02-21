import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';


const recordBtn = document.getElementById("recordBtn");
const video = document.getElementById("preview"); 

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
};

const downloadFile = (fileURL, fileName) => {
  const a = document.createElement("a");
  a.href = fileURL; 
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const handleDownload = async () => {
  recordBtn.innerText = "Transcoding ...";
  recordBtn.disabled = true;

  // ffmpeg 설정

  const ffmpeg = createFFmpeg({ 
    corePath: "/convert/ffmpeg-core.js",
    log: true 
  });
  // ffmpeg instance를 만든다.
  await ffmpeg.load();
  // 사용자가 소프트웨어를 사용할 것이기 때문에, await을 사용해 로드되기까지 기다려줘야 한다.
  // 사용자가 무언가를 설치해서 javascript가 아닌 코드를 브라우저에서 사용하는 것이다!

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  // ffmpeg는 가상의 컴퓨터라고 생각하자! 우리 마음대로 다룰 수 있다.
  // 이 가상 컴퓨터에 FS(파일 시스템)에 접근하여, 원하는 작업을 수행한다.
  // 여기서는 ffmpeg 세계에 파일을 만드는 작업을 수행함!


  // 비디오 녹화본 mp4 파일로 만들기

  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  // 위에서 만든 파일을 input으로 받아서 output.mp4 파일로 변환하라는 명령어를 사용.
  const mp4File = ffmpeg.FS("readFile", files.output);
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  // Binary 정보를 갖고 있는 파일 객체인 Blob 객체를 만든다. (videoFile도 Blob 객체였음.)
  const mp4URL = URL.createObjectURL(mp4Blob);


  // 썸네일(스크린샷으로 만든 것) jpg 파일로 만들기

  await ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumbnail);
  // 스크린샷을 찍어서 썸네일을 만들어주는 명령어. output 파일은 FS(파일 시스템)의 메모리에 만들어진다.
  const thumbnailFile = ffmpeg.FS("readFile", files.thumbnail);
  const thumbnailBolb = new Blob([thumbnailFile.buffer], { type: "image/jpg" });
  const thumbnailURL = URL.createObjectURL(thumbnailBolb);


  // 비디오, 이미지 파일 다운로드하기

  downloadFile(mp4URL, "MyRecording.mp4"); 
  downloadFile(thumbnailURL, "MyThumbnail.jpg");


  // 다운로드가 끝난 후 더 이상 필요없는 파일들과 Bolb들 삭제

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumbnail);

  URL.revokeObjectURL(mp4URL);
  URL.revokeObjectURL(thumbnailURL);
  URL.revokeObjectURL(videoFile);


  // 이후 작업 

  recordBtn.disabled = false;
  recordBtn.innerText = "Start Recording";
  recordBtn.removeEventListener("click", handleDownload);
  recordBtn.addEventListener("click", handleStartRecording);
  init();
};

const handleStopRecording = () => {
  recordBtn.innerText = "Download Recorded Video";
  recordBtn.removeEventListener("click", handleStopRecording);
  recordBtn.addEventListener("click", handleDownload);

  recorder.stop();
};
// 녹화 중지 버튼을 누르면, 녹화 중지에 해당하는 이벤트 리스너를 없애주고, 다운로드 이벤트 리스너를 등록한다.

const handleStartRecording = () => {
  recordBtn.innerText = "Stop Recording";
  recordBtn.removeEventListener("click", handleStartRecording);
  recordBtn.addEventListener("click", handleStopRecording);

  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    // 브라우저 메모리 상에 저장되어 있는 파일을 가리키는 URL을 만드는 함수.

    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };

  recorder.start();
};
// 녹화 시작 버튼을 누르면, 녹화 시작에 해당하는 이벤트 리스너를 없애주고, 녹화 중지 이벤트 리스너를 등록한다.
// MediaRecorder 객체를 통해 녹화를 진행하고, 녹화가 끝났을 때 결과물을 재생시키는 기능도 추가한다.

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  });
  video.srcObject = stream;
  video.play();
};

init();

recordBtn.addEventListener("click", handleStartRecording);