const whiteBoardCanvas = document.querySelector(".whiteboard-canvas");
const ctx = whiteBoardCanvas.getContext("2d");
const rect = whiteBoardCanvas.getBoundingClientRect();

var isDragging = false;
var texts = [];
var activeText = null;

var draggingOffsetX = 0; // mouse initial X position for dragging text
var draggingOffsetY = 0; // mouse initial Y position for dragging text

var canvasStack = null;

function addTextToCanvas(canvasStack) {
  
  whiteBoardCanvas.onclick = (event) => {
    event.preventDefault();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    if (!isDragging) {
      checkIfActiveText(mouseX, mouseY,canvasStack);
    }
  };

  whiteBoardCanvas.onmousedown = (event) => {
    isDragging = true;
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    activeText = texts.find(
      ({ x, y, text }) =>
        mouseX >= x &&
        mouseX <= x + ctx.measureText(text).width &&
        mouseY >= y - 10 &&
        mouseY <= y
    );

    if (activeText) {
      draggingOffsetX = mouseX - activeText.x;
      draggingOffsetY = mouseY - activeText.y;
    }
  };

  whiteBoardCanvas.onmousemove = (event) => {
    if (isDragging) {
      if (!activeText) return;
      activeText.x = event.clientX - rect.left - draggingOffsetX;
      activeText.y = event.clientY - rect.top - draggingOffsetY;

      ctx.clearRect(0, 0, whiteBoardCanvas.width, whiteBoardCanvas.height);
      
      // canvasStack.redrawCanvas();
      texts.forEach(({ x, y, text }) => {
        ctx.fillText(text, x, y);
      });
    }
  };

  whiteBoardCanvas.onmouseup = () => {
    activeText = null;
    isDragging = false;
  };
}

function checkIfActiveText(mouseX, mouseY,canvasStack) {
  activeText = texts.find(
    ({ x, y, text }) =>
      mouseX >= x &&
      mouseX <= x + ctx.measureText(text).width &&
      mouseY >= y - 10 &&
      mouseY <= y
  );
  if (activeText) {
    editTextBox(activeText,canvasStack);
  } else {
    createTextBox(mouseX, mouseY);
  }
}

function createTextBox(x, y) {
  var myInput = document.createElement("input");

  myInput.type = "text";
  myInput.style.position = "absolute";
  myInput.style.left = x + 70 + "px";
  myInput.style.top = y + "px";
  myInput.classList.add("canvas-text-input");

  ctx.font = "16px Arial";

  document.body.appendChild(myInput);

  setTimeout(() => myInput.focus(), 0);

  myInput.onblur = () => {
    let text = myInput.value;
    if (text.length > 0) {
      texts.push({ x, y, text });
      ctx.fillText(myInput.value, x, y);
      document.body.removeChild(myInput);
    } else {
      document.body.removeChild(myInput);
    }
  };
}

function editTextBox(textObj,canvasStack) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = textObj.text;
  input.style.position = "absolute";
  input.style.left = whiteBoardCanvas.offsetLeft + textObj.x + "px";
  input.style.top = whiteBoardCanvas.offsetTop + textObj.y - 16 + "px";
  input.style.fontSize = "16px";
  document.body.appendChild(input);

  setTimeout(() => input.focus(), 0);

  input.onblur = () => {
    if (input.value.length > 0) {
      textObj.text = input.value;

      ctx.clearRect(0, 0, whiteBoardCanvas.width, whiteBoardCanvas.height);

      // canvasStack.redrawCanvas();

      texts.forEach(({ x, y, text }) => {
        ctx.fillText(text, x, y);
      });
      document.body.removeChild(input);
    } else {

      ctx.clearRect(0, 0, whiteBoardCanvas.width, whiteBoardCanvas.height);

      // canvasStack.redrawCanvas();

      let remainingTexts = texts.filter(
        ({ x, y, text }) =>
          x !== textObj.x && y !== textObj.y && text !== textObj.text
      );

      remainingTexts.forEach(({ x, y, text }) => {
        ctx.fillText(text, x, y);
      });

      texts = remainingTexts;

      document.body.removeChild(input);
    }
  };
}

export { addTextToCanvas };
