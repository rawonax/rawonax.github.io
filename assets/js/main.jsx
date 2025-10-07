import React from "react";
import ReactDOM from "react-dom/client";
import DinoRunner from "./mouse-dino-game.jsx";

// ✅ 전역 스타일 정의
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  body {
    font-family: 'Pacifico', cursive;
    font-weight: bold;
    color: #fff;
    text-align: center;
    background-color: #000;
    margin: 0;
    padding: 0;
  }

  /* 점수판 폰트 굵게 */
  .game-scoreboard p {
    font-family: 'Pacifico', cursive;
    font-weight: bold;
    font-size: 36px;
    text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
    letter-spacing: 1px;
  }
`;

// ✅ <style> 태그로 전역 스타일 삽입
const styleTag = document.createElement("style");
styleTag.innerHTML = globalStyle;
document.head.appendChild(styleTag);

ReactDOM.createRoot(document.getElementById("game-root")).render(
  <React.StrictMode>
    <DinoRunner />
  </React.StrictMode>
);
