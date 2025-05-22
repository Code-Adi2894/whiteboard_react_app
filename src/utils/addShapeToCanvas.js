// const whiteBoardCanvas = document.querySelector(".whiteboard-canvas");
// const ctx = whiteBoardCanvas.getContext("2d");
// const rect = whiteBoardCanvas.getBoundingClientRect();

const shapeSelectionContainer = document.querySelector(
  ".shape-selection-container"
);
shapeSelectionContainer.classList.add("hidden");

function addShapeToCanvas(whiteBoardCanvas, shape) {
  var ctx = whiteBoardCanvas.getContext('2d');
  const rect = whiteBoardCanvas.getBoundingClientRect();
  whiteBoardCanvas.onclick = (event) => {
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    switch (shape) {
      case "rectangle":
        ctx.beginPath();
        ctx.strokeRect(mouseX, mouseY, 150, 100);
        ctx.stroke();
        ctx.closePath();
        addtoCanvasStack("rectangle", mouseX, mouseY, canvasStack);
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY - 50); // starting point of the line
        ctx.lineTo(mouseX + 50, mouseY + 50); // ending point of the line
        ctx.lineTo(mouseX - 50, mouseY + 50);
        ctx.closePath();
        ctx.stroke();
        addtoCanvasStack("triangle", mouseX, mouseY, canvasStack);
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
        addtoCanvasStack("circle", mouseX, mouseY, canvasStack);
        break;
      default:
        break;
    }
  };
  whiteBoardCanvas.onmousemove = (e) => {
    e.preventDefault();
  };
}

function addtoCanvasStack(shapeName, x, y, canvasStack) {
  var shape = canvasStack.createShapeObj();
  shape.type = "shape";
  shape.subType = shapeName;
  shape.x = x;
  shape.y = y;
  canvasStack.addCanvasObj(shape);
}

export { addShapeToCanvas };
