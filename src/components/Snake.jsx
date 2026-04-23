export default function Snake({ snakeBody, cellSize }){
    return (
        <>
            {snakeBody.map((segment, index) => (
                <div
                    key={index}
                    className={`absolute rounded-sm ${
                        index === 0
                            ? 'bg-green-600 border-1 border-green-800' 
                            : 'bg-green-500' 
                    }`}
                    style={{
                        left: segment.x * cellSize + 2,
                        top: segment.y * cellSize + 2,
                        width: cellSize - 4,
                        height: cellSize -4,
                    }}
                />
            ))}
        </>
    );
}
