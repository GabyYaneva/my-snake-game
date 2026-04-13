import { useState , useEffect, useCallback } from "react"
const GRID_SIZE =20
const CELL_SIZE=25
const START_SPEED=150

function App(){

  const[snake,setSnake]=useState([
    {x:10,y:10},
    {x:10,y:11},
    {x:10,y:12}
  ])

const[direction,setDirection]=useState({x:0,y:-1})

const[apple,setApple]=useState({x:15,y:5})

const[score,setScore]=useState(0)

const [gameOver,setGameOver]=useState(false)

const[isPlaying,setIsPlaying]=useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify=center p-4">
      <h1 className="text-5-1 font-bold text-yellow-400 mb-4">🐍Snake🐍</h1>
      <p>Wellocome in the game</p>
      <p className="text-red-400">Score:<span className="text-red-400">{score}</span></p>
    <div className="text-grey-400 text-sm">
    <p>Head: X:{snake[0].x} Y:{snake[0].y}</p>
    <p>Apple: X:{apple.x} Y:{apple.y}</p>
    <p>Game: {isPlaying?'Started':'OnPause'}</p>
    </div>
    
    </div>
  )
}



export default App