const recordBtn = document.getElementById("recordBtn");
const video = document.getElementById("preview"); 

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile; 
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  recordBtn.innerText = "Start Recording";
  recordBtn.removeEventListener("click", handleDownload);
  recordBtn.addEventListener("click", handleStartRecording);
  init();
};
// videoFile의 URL로 갈 수 있는 a태그 추가
// a태그에 download 속성 추가
// a.click()으로 링크 클릭 실행시켜 주기 

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
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

recordBtn.addEventListener("click", handleStartRecording);