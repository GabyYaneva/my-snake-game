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
      <p>Wellocome to the game</p>
      <p>Use arrows</p>
      <p className="text-red-400">Score:<span className="text-red-400">{score}</span></p>
    <div className="re;ative bg-grey-800 border-4 border-yellow-500 shadow-2x1" 
    style={{
      width:GRID_SIZE*CELL_SIZE,
      height:GRID_SIZE*CELL_SIZE
    }}>
    {snake.map((segment,index)=>(
      <div
      key={index}
      className="absolute bg-green-500 rounded-sm"
      style={{
        width:CELL_SIZE-5,
        height:CELL_SIZE-2,
        left:segment.x*CELL_SIZE+1,
        top:segment.y*CELL_SIZE+1
      }}></div> 
    ))}
    <div className="absolute bg-red-500 rounded-full"
    style={{
      width:CELL_SIZE-4,
      height:CELL_SIZE-4,
      top: apple.x*CELL_SIZE+2,
      left:apple.y*CELL_SIZE+2
    }}>

    </div>
    </div>
    
    </div>
  )
}



export default App