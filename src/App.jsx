import React, { useState, useEffect } from "react";
import Terminal from "./Terminal";
import "./App.css";

// Импортируем изображение напрямую
import backgroundImage from "../pic/picture1.png";

function App() {
  const [isCreative, setIsCreative] = useState(false);

  React.useEffect(() => {
    const setHeight = () => {
      document.documentElement.style.height = `${window.innerHeight}px`;
      document.body.style.height = `${window.innerHeight}px`;
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    window.addEventListener("orientationchange", setHeight);

    return () => {
      document.body.style.background = "";
      window.removeEventListener("resize", setHeight);
      window.removeEventListener("orientationchange", setHeight);
    };
  }, []);

  // Эффект для установки фона в зависимости от режима
  useEffect(() => {
    if (isCreative) {
      document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage}) no-repeat center center fixed`;
      document.body.style.backgroundSize = "cover";
    } else {
      document.body.style.background = "#0a0a0a";
      document.body.style.backgroundImage = "none";
    }
  }, [isCreative]);

  const titleColor = isCreative ? "#55ff55" : "#e69526";
  const subtitleColor = isCreative ? "#55ff55" : "#ccc";

  return (
    <div className="app-container">
      <div className="app-content">
        <header className="app-header">
          <h1 className="main-title" style={{ color: titleColor }}>
            Терминал поиска поздравления
          </h1>
          <p className="subtitle" style={{ color: subtitleColor }}>
            B-DAY RUSLAN
          </p>
        </header>

        <Terminal isCreative={isCreative} setIsCreative={setIsCreative} />

        <footer
          className="app-footer"
          style={{ color: isCreative ? "#55ff55" : "#ccc" }}
        >
          "Still Alive :)" — Module 2025-PROG
        </footer>
      </div>
    </div>
  );
}

export default App;
