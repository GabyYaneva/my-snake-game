import { useState } from 'react';

export function useGameState() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const play = () => {
        if (!isGameOver) {
            setIsPlaying(true);
        }
    };

    const reset = () => {
        setIsPlaying(false);
        setIsGameOver(false);
    };

    const checkGameOver = (snakeHead, gridSize) => {
        const { x, y } = snakeHead;
        if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
            setIsPlaying(false);
            setIsGameOver(true);
            return true;
        }
        return false;
    };

    return {
        isPlaying,
        isGameOver,
        play,
        reset,
        checkGameOver
    };
}

export default function GameState({ isPlaying, isGameOver, onPlay, onReset }) {
    return (
        <div className="flex gap-4 mt-4">
            <button
                onClick={onPlay}
                disabled={isGameOver}
                className={`px-4 py-2 rounded ${
                    isGameOver
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
                {isPlaying ? 'Playing' : 'Play'}
            </button>
            <button
                onClick={onReset}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
                Reset
            </button>
            {isGameOver && (
                <div className="text-red-500 font-bold">
                    Game Over!
                </div>
            )}
        </div>
    );
}