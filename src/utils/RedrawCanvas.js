class RedrawCanvas {
  canvasUrl = null;

  canvasToUrl(canvas) {
    this.canvasUrl = canvas.toDataUrl("image/png");
    console.log(this.canvasUrl);
    return this.canvasUrl;
  }

  drawImage(ctx) {
    const img = new Image();
    img.src = this.canvasUrl;
    img.onload = () => ctx.drawImage(img, 0, 0);
  }
}

export default RedrawCanvas;
