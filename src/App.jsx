import { useState} from "react";
import Board from "./components/Board"

const GRID_SIZE = 20;
const CELL_SIZE = 25;

export default function App() {

    const [score, setScore] = useState(0);

    return(
        <div className="min-h-screen bg-blue-800 flex flex-col items-center justify-center p-4">
<h1 className="text-5xl font-bold text-amber-300 drop-shadow-lg">
    🐍Snake🐍</h1>
    <p className="text-2xl text-amber-200 mt-6">
        Score: <span className="text-red-500 font-bold">
            {score}</span>
    </p>
<Board gridSize={GRID_SIZE} cellSize={CELL_SIZE}>
   
</Board>


        </div>
    );
}
