export default function Board({children,gridSize=20,cellSize=25}) {

    const bWidth = gridSize * cellSize;
    const bHeight = gridSize * cellSize;

    return(
        <div className="relative bg-amber-100 border-blue-950 border-4 shadow-2xl overflow-hidden"
            style={{width: bWidth, height: bHeight}}>
{children}
        </div>
    );
}