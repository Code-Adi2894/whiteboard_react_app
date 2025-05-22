import { useContext, useEffect, useRef, useState } from "react";
import "../styles/Sidebar.css";
import { ToolContext } from "../contexts/ToolContext";

export default function Sidebar() {
  const { _, setCurrentTool } = useContext(ToolContext);

  const [showShapesBar, setShowShapesBar] = useState(false);

  const [currentShape, setCurrentShape] = useState("rectangle");

  const longPressTimer = useRef(null);
  const shapeToolSelectorRef = useRef(null);

  function handleLongPressStart() {
    longPressTimer.current = setTimeout(() => {
      setShowShapesBar(true);
    }, 700);
  }

  function handleLongPressStop() {
    clearTimeout(longPressTimer.current);
  }

  function handleSelectedIcon(e) {
    var id = e.target.id;
    switch (id) {
      case "pencil-tool":
        setCurrentTool("pencil");
        break;
      case "shapes-tool":
        setShowShapesBar(true);
        setCurrentTool("shapes");
        break;
      case "text-tool":
        setCurrentTool("text");
        break;
      case "eraser-tool":
        setCurrentTool("eraser");
        break;
      case "upload-tool":
        setCurrentTool("upload");
        break;
      case "download-tool":
        setCurrentTool("download");
        break;
      case "undo-tool":
        setCurrentTool("undo");
        break;
      case "redo-tool":
        setCurrentTool("redo");
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (shapeToolSelectorRef.current) {
      switch (currentShape) {
        case "rectangle":
          shapeToolSelectorRef.current.id = "rectangle-tool";
          break;
        case "circle":
          shapeToolSelectorRef.current.id = "circle-tool";
          break;
        case "triangle":
          shapeToolSelectorRef.current.id = "triangle-tool";
          break;
        default:
          break;
      }
    } else {
      console.log("not");
    }
  }, [currentShape]);

  return (
    <div className="sidebar">
      <div
        className="sidebar-icon-container"
        id="pencil-tool"
        onClick={handleSelectedIcon}
      ></div>
      <div
        className="sidebar-icon-container"
        id="shapes-tool"
        ref={shapeToolSelectorRef}
        // onClick={handleSelectedIcon}
        onMouseDown={handleLongPressStart}
        onMouseUp={handleLongPressStop}
      ></div>
      <div
        className="sidebar-icon-container"
        id="text-tool"
        onClick={handleSelectedIcon}
      ></div>
      <div
        className="sidebar-icon-container"
        id="eraser-tool"
        onClick={handleSelectedIcon}
      ></div>
      <div
        className="sidebar-icon-container"
        id="upload-tool"
        onClick={handleSelectedIcon}
      ></div>
      <div
        className="sidebar-icon-container"
        id="download-tool"
        onClick={handleSelectedIcon}
      ></div>
      <div
        className="sidebar-icon-container"
        id="undo-tool"
        onClick={handleSelectedIcon}
      ></div>
      <div
        className="sidebar-icon-container"
        id="redo-tool"
        onClick={handleSelectedIcon}
      ></div>

      <div
        className={`shape-selection-container ${
          !showShapesBar ? "hidden" : ""
        }`}
      >
        <div
          className="shape-icon-container"
          id="rectangle-tool"
          onClick={() => {
            setCurrentShape("rectangle");
            setShowShapesBar(false);
          }}
        ></div>
        <div
          className="shape-icon-container"
          id="circle-tool"
          onClick={() => {
            setCurrentShape("circle");
            setShowShapesBar(false);
          }}
        ></div>
        <div
          className="shape-icon-container"
          id="triangle-tool"
          onClick={() => {
            setCurrentShape("triangle");
            setShowShapesBar(false);
          }}
        ></div>
      </div>
    </div>
  );
}
