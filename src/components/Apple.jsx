    export default function Apple({ position, cellSize }){
    const { x, y } = position;

    return (
        <div
            className="absolute text-2xl flex justify-center bg-red-700 rounded-full"
            style={{
                left: x * cellSize + 2,
                top: y * cellSize + 2,
                width: cellSize - 6,
                height: cellSize - 6
            }}
        >
           
        </div>
    );
}

export function generateRandomApple(gridSize, snakeBody = []){
    let newPosition;
    let attempts = 0;
    const maxAttempts = 100;

    do {
        newPosition = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
        attempts++;
    } while (
        attempts < maxAttempts &&
        snakeBody.some(segment => segment.x === newPosition.x && segment.y === newPosition.y)
    );

    return newPosition;
}

export function handleAppleEaten(setScore, gridSize, snakeBody) {
    setScore(prevScore => prevScore + 10);

    return generateRandomApple(gridSize, snakeBody);
}