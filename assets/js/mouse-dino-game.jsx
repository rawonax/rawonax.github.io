import React, { useEffect, useState } from "react";
import "./mouse-avoid-game.css";

export default function DinoRunner({
  backgroundImage = "/assets/images/whitehouse.jpg",
  obstacleImage = "/assets/images/trump.jpeg",
  playerImage = "/assets/images/player.png",
}) {
  const groundY = 100;
  const gravity = 1.1;
  const jumpPower = 18;
  const obstacleInterval = 1500;

  const [playerY, setPlayerY] = useState(groundY);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore") || "0")
  );
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(8);

  // 🦘 점프
  const handleJump = () => {
    if (!isJumping && !gameOver) {
      setVelocity(-jumpPower);
      setIsJumping(true);
    }
  };

  // ⌨️ 스페이스바로 점프
useEffect(() => {
  const keyHandler = (e) => {
    if (e.code === "Space") {
      e.preventDefault(); // ✅ 기본 스크롤 방지
      handleJump();
    }
  };
  window.addEventListener("keydown", keyHandler);
  return () => window.removeEventListener("keydown", keyHandler);
}, [isJumping, gameOver]);

  // 🧮 중력 물리
  useEffect(() => {
    if (gameOver) return;
    const physics = setInterval(() => {
      setPlayerY((prev) => {
        let newY = prev + velocity;
        if (newY >= groundY) {
          newY = groundY;
          setVelocity(0);
          setIsJumping(false);
        } else {
          setVelocity((v) => v + gravity);
        }
        return newY;
      });
    }, 30);
    return () => clearInterval(physics);
  }, [velocity, isJumping, gameOver]);

  // 🧱 장애물 이동
  useEffect(() => {
    if (gameOver) return;
    const move = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((o) => ({ ...o, x: o.x - speed }))
          .filter((o) => o.x > -60)
      );
    }, 30);
    return () => clearInterval(move);
  }, [speed, gameOver]);

  // 🚧 장애물 생성
  useEffect(() => {
    if (gameOver) return;
    const spawn = setInterval(() => {
      setObstacles((prev) => [...prev, { x: 800 }]);
    }, obstacleInterval);
    return () => clearInterval(spawn);
  }, [gameOver]);

  // 💥 충돌 감지
  useEffect(() => {
    for (const obs of obstacles) {
      const playerX = 80;
      const playerWidth = 50;
      const obsWidth = 50;
      const obsY = groundY;
      if (
        obs.x < playerX + playerWidth &&
        obs.x + obsWidth > playerX &&
        playerY >= obsY - 30
      ) {
        setGameOver(true);
      }
    }
  }, [obstacles, playerY]);

  // 🧾 점수 & 속도
  const [animate, setAnimate] = useState(false);
useEffect(() => {
  if (gameOver) return;
  const interval = setInterval(() => {
    setScore((s) => s + 1);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300); // 0.3초 후 해제
    if (score % 100 === 0) setSpeed((spd) => spd + 0.5);
  }, 100);
  return () => clearInterval(interval);
}, [gameOver, score]);

  // 🏆 최고점 업데이트
  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score.toString());
      }
    }
  }, [gameOver]);

  // 🔁 재시작
  const restartGame = () => {
    setObstacles([]);
    setPlayerY(groundY);
    setVelocity(0);
    setScore(0);
    setSpeed(8);
    setGameOver(false);
  };

  return (
    <div
      className="game-root"
      onClick={handleJump}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* 🎯 점수판 */}
<div className="game-scoreboard">
  <p className={animate ? "score-animate" : ""}>Score: {score}</p>
  <p>High: {highScore}</p>
</div>


      {/* 🧍‍♀️ 플레이어 */}
      <img
        src={playerImage}
        alt="player"
        style={{
          position: "absolute",
          bottom: `${playerY}px`,
          left: "80px",
          width: "60px",
          height: "60px",
          transition: "bottom 0.05s linear",
        }}
      />

      {/* 🧱 장애물 */}
      {obstacles.map((obs, i) => (
        <img
          key={i}
          src={obstacleImage}
          alt="obstacle"
          style={{
            position: "absolute",
            bottom: `${groundY}px`,
            left: `${obs.x}px`,
            width: "50px",
            height: "50px",
          }}
        />
      ))}

      {/* 💀 게임오버 */}
      {gameOver && (
        <div className="game-over">
          <h1>Game Over</h1>
          <p className="text-sm text-gray-300 mb-3">
            Your Score: {score} <br />
            Best: {highScore}
          </p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}



