import { useState, useEffect, useCallback, useRef } from "react";
import Board from "./components/Board"
import Apple, { generateRandomApple } from "./components/Apple"
import Snake from "./components/Snake"
import Controls from "./components/Controls"
import GameState, { useGameState } from "./components/gameState"
import { runGame } from "./gameLoop";

const GRID_SIZE = 20;
const CELL_SIZE = 25;
const INIT_SNAKE=[{x:10,y:10}];
const INIT_DIRECTION={ x: 1, y: 0 };

export default function App() {

    const [score, setScore] = useState(0);
    const [applePosition, setApplePosition] = useState(() =>
         generateRandomApple(GRID_SIZE,INIT_SNAKE));
    const [snakeBody,setSnakeBody]=useState(INIT_SNAKE);
    const[direction,setDirection]=useState(INIT_DIRECTION);
    const { isPlaying,isGameOver,play,reset,forceGameOver} = useGameState();

const dirrctionRef=useRef(direction);
useEffect(()=>{
dirrctionRef.current=direction;
},[direction]
);

    const resetGame = () => {
       reset();
       setScore(0);
       setSnakeBody(INIT_SNAKE);
       setDirection(INIT_DIRECTION);
       dirrctionRef.current=INIT_DIRECTION;
       setApplePosition(generateRandomApple(GRID_SIZE,INIT_SNAKE));
    };

    const moveSnake = useCallback(()=>
    {
        setSnakeBody(currentSnake=>{
            const currDirection=dirrctionRef.current;
            const res=runGame(
                currentSnake,
                currDirection,
                applePosition,
                GRID_SIZE,
                score
            );

            if(res.gameOver){
                forceGameOver();
                return currentSnake;
            }

            if(res.applePosition!==applePosition){
                setApplePosition(res.applePosition);
            }

            if(res.score!==score){
                setScore(res.score);
            }

            return res.body;
        });
    },[applePosition,score,forceGameOver]
);

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
