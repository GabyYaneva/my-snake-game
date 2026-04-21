import { useEffect } from 'react';

export default function Controls({ onDirectionChange, currentDirection }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            let newDirection = null;

            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (currentDirection.y === 0) { 
                        newDirection = { x: 0, y: -1 };
                    }
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (currentDirection.y === 0) {
                        newDirection = { x: 0, y: 1 };
                    }
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (currentDirection.x === 0) {
                        newDirection = { x: -1, y: 0 };
                    }
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (currentDirection.x === 0) {
                        newDirection = { x: 1, y: 0 };
                    }
                    break;
            }

            if (newDirection) {
                onDirectionChange(newDirection);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onDirectionChange, currentDirection]);

}