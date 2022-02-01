const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const rangeValue = document.getElementById("jsRangeValue");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

let painting = false;
let filling = false;

// canvas의 default background 값을 준다. (흰색)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;
ctx.fillStyle = "black";

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke(); 
  }
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  rangeValue.innerText = `Line Weight : ${size}`;
}

function handelModeBtnClick(event) {
  if (filling === true) {
    filling = false;
    modeBtn.innerText = "fill";
    ctx.strokeStyle = ctx.fillStyle;
  } else {
    filling = true;
    modeBtn.innerText = "paint";
    ctx.fillStyle = ctx.strokeStyle;
  }
}

function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  colors.forEach((elem) => {
    console.log(elem);
    if (elem.style.backgroundColor === color) {
      elem.classList.add("color--clicked");
    } else {
      elem.classList.remove("color--clicked");
    }
  })
}

function handleSaveBtnClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "yourPaintJS";
  link.click();
}

function handleClearBtnClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting); 
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange)
}

if (modeBtn) {
  modeBtn.addEventListener("click", handelModeBtnClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveBtnClick);
}

if (clearBtn) {
  clearBtn.addEventListener("click", handleClearBtnClick)
}