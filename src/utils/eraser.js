const whiteBoardCanvas = document.querySelector(".whiteboard-canvas");
const ctx = whiteBoardCanvas.getContext("2d");
const rect = whiteBoardCanvas.getBoundingClientRect();

var isErasing = false;

function eraser(currentCanvasStack) {
  whiteBoardCanvas.onmousedown = (event) => {
    event.preventDefault();
    isErasing = true;
    ctx.globalCompositeOperation = "destination-out"; // Erase mode
    ctx.lineWidth = 10; // Eraser size
  };

  whiteBoardCanvas.onmousemove = (event) => {
    event.preventDefault();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    if (isErasing) {
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2); // Circular eraser
      ctx.fill();
    }
  };

  whiteBoardCanvas.onmouseup = (event) => {
    event.preventDefault();
    isErasing = false;
    ctx.globalCompositeOperation = "source-over"; // Restore normal drawing
  }
  whiteBoardCanvas.onclick = (event) => {
    event.preventDefault();
  }
}

export { eraser };
