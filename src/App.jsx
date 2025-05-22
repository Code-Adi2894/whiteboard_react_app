import "./App.css";
import Sidebar from "./components/Sidebar";
import { ToolProvider, ToolContext } from "./contexts/ToolContext";
import WhiteBoard from "./components/WhiteBoard";
import { useContext, useEffect } from "react";

// import { drawWithPencil } from "./utils/drawWithPencil";
// import {addShapeToCanvas} from './utils/addShapeToCanvas';

function InnerApp() {

  return (
    <div className="container">
      <Sidebar />
      <WhiteBoard />
    </div>
  );
}

function App() {
  return (
    <ToolProvider>
      <InnerApp />
    </ToolProvider>
  );
}

export default App;
