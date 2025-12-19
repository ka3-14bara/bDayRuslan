import React, { useState, useEffect } from "react";
import Terminal from "./Terminal";
import "./App.css";

// Импортируем изображение напрямую
import backgroundImage from "../pic/picture1.png";

function App() {
  const [isCreative, setIsCreative] = useState(false);

  React.useEffect(() => {
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";

    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.style.height = "100%";
      rootElement.style.width = "100%";
      rootElement.style.margin = "0";
      rootElement.style.padding = "0";
    }

    // Очищаем фон при размонтировании
    return () => {
      document.body.style.background = "";
    };
  }, []);

  // Эффект для установки фона в зависимости от режима
  useEffect(() => {
    if (isCreative) {
      console.log("Креативный режим активирован, фон:", backgroundImage);
      document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage}) no-repeat center center fixed`;
      document.body.style.backgroundSize = "cover";
    } else {
      console.log("Креативный режим выключен");
      document.body.style.background = "#0a0a0a";
      document.body.style.backgroundImage = "none";
    }
  }, [isCreative]);

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#ccc",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    boxSizing: "border-box",
  };

  const contentStyle = {
    width: "100%",
    maxWidth: "900px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  // Определяем цвета в зависимости от режима
  const titleColor = isCreative ? "#55ff55" : "#e69526";
  const subtitleColor = isCreative ? "#55ff55" : "#ccc";

  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <header
          style={{ textAlign: "center", marginBottom: "30px", width: "100%" }}
        >
          <h1 style={{ color: titleColor, fontSize: "2.5rem", margin: "0" }}>
            Терминал поиска поздравления
          </h1>
          <p
            style={{
              letterSpacing: "3px",
              opacity: 0.7,
              color: subtitleColor,
            }}
          >
            B-DAY RUSLAN
          </p>
        </header>

        <Terminal isCreative={isCreative} setIsCreative={setIsCreative} />

        <footer
          style={{
            marginTop: "40px",
            fontSize: "12px",
            opacity: 0.4,
            textAlign: "center",
            color: isCreative ? "#55ff55" : "#ccc",
          }}
        >
          "Still Alive :) " — Module 2025-PROG
        </footer>
      </div>
    </div>
  );
}

export default App;
