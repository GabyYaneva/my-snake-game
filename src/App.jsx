import { useState, useEffect, useCallback } from "react";
import Board from "./components/Board"
import Apple, { generateRandomApple } from "./components/Apple"
import Snake from "./components/Snake"
import Controls from "./components/Controls"
import GameState, { useGameState } from "./components/gameState"

const GRID_SIZE = 20;
const CELL_SIZE = 25;

export default function App() {

    const [score, setScore] = useState(0);
    const [applePosition, setApplePosition] = useState(() => generateRandomApple(GRID_SIZE));
    const [snakeBody, setSnakeBody] = useState([{ x: 10, y: 10 }]);
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const { isPlaying, isGameOver, play, reset, checkGameOver } = useGameState();

    const resetGame = () => {
        reset();
        setScore(0);
        setApplePosition(generateRandomApple(GRID_SIZE));
        setSnakeBody([{ x: 10, y: 10 }]);
        setDirection({ x: 1, y: 0 });
    };

    const moveSnake = useCallback(() => {
        setSnakeBody(currentSnake => {
            const head = currentSnake[0];
            const newHead = {
                x: head.x + direction.x,
                y: head.y + direction.y
            };

            if (checkGameOver(newHead, GRID_SIZE)) {
                return currentSnake; 
            }

            let newSnake = [newHead, ...currentSnake];

            const ateApple = newHead.x === applePosition.x && newHead.y === applePosition.y;

            if (!ateApple) {
                newSnake = newSnake.slice(0, -1);
            } else {
                setScore(prev => prev + 10);
                setApplePosition(generateRandomApple(GRID_SIZE, newSnake));
            }

            return newSnake;
        });
    }, [direction, applePosition, checkGameOver]);

    useEffect(() => {
        if (isPlaying && !isGameOver) {
            const gameInterval = setInterval(moveSnake, 200);
            return () => clearInterval(gameInterval);
        }
    }, [moveSnake, isPlaying, isGameOver]);

    return(
        <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
<h1 className="text-5xl font-bold text-amber-300 drop-shadow-lg">
    🐍Snake🐍</h1>
    <p className="text-2xl text-amber-200 mt-6">
        Score: <span className="text-red-500 font-bold">
            {score}</span>
    </p>
<Board gridSize={GRID_SIZE} cellSize={CELL_SIZE}>
   <Snake snakeBody={snakeBody} cellSize={CELL_SIZE} />
   <Apple position={applePosition} cellSize={CELL_SIZE} />
</Board>
<GameState isPlaying={isPlaying} isGameOver={isGameOver} onPlay={play} onReset={resetGame} />
<Controls onDirectionChange={setDirection} currentDirection={direction} />

        </div>
    );
}
