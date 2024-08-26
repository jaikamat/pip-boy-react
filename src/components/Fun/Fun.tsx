import React, { useEffect, useState, useRef } from "react";
import "./Fun.css";

const SNAKE_SPEED = 200; // Snake speed in milliseconds
const GRID_COLUMNS = 32; // 32 columns to match the width
const GRID_ROWS = 14; // 14 rows to match the height

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface Position {
  x: number;
  y: number;
}

const getRandomPosition = (): Position => {
  return {
    x: Math.floor(Math.random() * GRID_COLUMNS),
    y: Math.floor(Math.random() * GRID_ROWS),
  };
};

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [food, setFood] = useState<Position>(getRandomPosition());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const snakeRef = useRef<Position[]>(snake);
  const directionRef = useRef<Direction>(direction);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (directionRef.current !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (directionRef.current !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (directionRef.current !== "LEFT") setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      moveSnake();
    }, SNAKE_SPEED);

    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  const moveSnake = () => {
    const newSnake = [...snakeRef.current];
    const head = { ...newSnake[0] };

    switch (directionRef.current) {
      case "UP":
        head.y = (head.y - 1 + GRID_ROWS) % GRID_ROWS;
        break;
      case "DOWN":
        head.y = (head.y + 1) % GRID_ROWS;
        break;
      case "LEFT":
        head.x = (head.x - 1 + GRID_COLUMNS) % GRID_COLUMNS;
        break;
      case "RIGHT":
        head.x = (head.x + 1) % GRID_COLUMNS;
        break;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomPosition());
    } else {
      newSnake.pop();
    }

    if (checkCollision(newSnake)) {
      setGameOver(true);
    } else {
      setSnake(newSnake);
    }
  };

  const checkCollision = (snake: Position[]): boolean => {
    const [head, ...body] = snake;
    return body.some((segment) => segment.x === head.x && segment.y === head.y);
  };

  return (
    <div className="snake-game">
      {gameOver ? (
        <div className="game-over">GAME OVER</div>
      ) : (
        <div className="grid">
          {Array.from(Array(GRID_ROWS)).map((_, rowIndex) =>
            Array.from(Array(GRID_COLUMNS)).map((_, colIndex) => {
              const isSnake = snake.some(
                (segment) => segment.x === colIndex && segment.y === rowIndex
              );
              const isFood = food.x === colIndex && food.y === rowIndex;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${isSnake ? "snake" : ""} ${
                    isFood ? "food" : ""
                  }`}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
