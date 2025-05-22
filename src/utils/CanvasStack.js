class CanvasStack {
  constructor(ctx) {
    this.canvasStack = [];
    this.ctx = ctx;
  }
  addCanvasObj(obj) {
    this.canvasStack.push(obj);
  }

  createPathObj() {
    var pathObj = { type: "path", path: [] };
    return pathObj;
  }

  createTextObj() {
    var textObj = { type: "text", x: null, y: null, text: "" };
    return textObj;
  }

  createShapeObj() {
    var shapeObj = { type: "shape", subType: null, x: null, y: null };
    return shapeObj;
  }

  deleteImage() {}

  redrawCanvas() {
    this.canvasStack.forEach((item) => {
      switch (item.type) {
        case "path":
          item.path.forEach((path) => {
            this.#drawPath(path);
          });
          break;
        case "text":
          this.ctx.fillText(item.text, item.x, item.y);
          break;
        case "shape":
          switch (item.subType) {
            case "rectangle":
              this.ctx.beginPath();
              this.ctx.strokeRect(item.x, item.y, 150, 100);
              this.ctx.stroke();
              this.ctx.closePath();
              break;
            case "triangle":
              this.ctx.beginPath();
              this.ctx.moveTo(item.x, item.y - 50); // starting point of the line
              this.ctx.lineTo(item.x + 50, item.y + 50); // ending point of the line
              this.ctx.lineTo(item.x - 50, item.y + 50);
              this.ctx.closePath();
              this.ctx.stroke();
              break;
            case "circle":
              this.ctx.beginPath();
              this.ctx.arc(item.x, item.y, 50, 0, Math.PI * 2);
              this.ctx.stroke();
              this.ctx.closePath();
              break;
          }
        default:
          break;
      }
    });
  }

  #drawPath(path) {
    this.ctx.beginPath();
    path.forEach((point, index) => {
      if (index === 0) {
        this.ctx.moveTo(point.x, point.y);
      } else {
        this.ctx.lineTo(point.x, point.y);
      }
    });
    this.ctx.stroke();
  }
}

export default CanvasStack;
