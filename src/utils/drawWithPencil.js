// const whiteBoardCanvas = document.querySelector(".whiteboard-canvas");
// const ctx = whiteBoardCanvas.getContext("2d");
// const rect = whiteBoardCanvas.getBoundingClientRect();

import RedrawCanvas from "./RedrawCanvas";

var isMoving = false;
var points = null;
var paths = [];

// const redrawCanvas = new RedrawCanvas();

function drawWithPencil(whiteBoardCanvas) {
  var ctx = whiteBoardCanvas.getContext('2d');
  const rect = whiteBoardCanvas.getBoundingClientRect();

  whiteBoardCanvas.onmousedown = (e) => {
    e.preventDefault();
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    points = [];
    isMoving = true;
  };
  whiteBoardCanvas.onmousemove = (e) => {
    e.preventDefault();
    if (isMoving) {
      var mouseX = e.clientX - rect.left;
      var mouseY = e.clientY - rect.top;
      points.push({ x: mouseX, y: mouseY });
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 3;
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
    }
  };
  whiteBoardCanvas.onmouseup = (e) => {
    e.preventDefault();
    isMoving = false;
    // let pathObj = canvasStack.createPathObj();
    paths.push(points);
    // pathObj.path = paths;
    // canvasStack.addCanvasObj(pathObj);
    // console.log(pathObj);
    ctx.closePath();
    // let currentCanvasImage = redrawCanvas.canvasToUrl(whiteBoardCanvas);
    // currentCanvasImage()
  };
  whiteBoardCanvas.onclick = (e) => {
    e.preventDefault();
  };
}


export { drawWithPencil };
