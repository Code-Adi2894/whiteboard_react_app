import "../styles/WhiteBoard.css";
import { ToolContext } from "../contexts/ToolContext";
import { useContext, useEffect, useRef } from "react";
import { drawWithPencil } from "../utils/drawWithPencil";

export default function WhiteBoard() {
  var toolContext = useContext(ToolContext);

  const canvasRef = useRef(null);

// useEffect(() => console.log(canvasRef))

  useEffect(() => {
    var canvasDOM = canvasRef.current;
    switch (toolContext.currentTool) {
      case "pencil":
        console.log("pencil");
        drawWithPencil(canvasDOM);
        break;
      case "shapes":
        console.log("shapes");
        // addShapeToCanvas()
        break;
      case "text":
        console.log("text");
        break;
      case "eraser":
        console.log("eraser");
        break;
      case "upload":
        console.log("upload");
        break;
      case "download":
        console.log("download");
        break;
      case "undo":
        console.log("undo");
        break;
      case "redo":
        console.log("redo");
        break;
      default:
        break;
    }
  });

  return (
    <canvas ref={canvasRef} className="whiteboard-canvas" height={490} width={1200}></canvas>
  );
}
