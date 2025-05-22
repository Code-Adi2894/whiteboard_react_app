import { createContext, useState } from "react";

// creating the context
export const ToolContext = createContext();

// creating the provider component
export function ToolProvider({ children }) {
  const [currentTool, setCurrentTool] = useState(null);
  const [showShapesBar, setShowShapesBar] = useState(false);

  return (
    <ToolContext.Provider
      value={{ currentTool, setCurrentTool, showShapesBar, setShowShapesBar }}
    >
      {children}
    </ToolContext.Provider>
  );
}
