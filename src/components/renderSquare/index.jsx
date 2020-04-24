import Knight from "../Knight";
import Square from "../Square";

function renderSquare(i, [knightX, knightY]) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1
    const isKnightHere = knightX === x && knightY === y
    const piece = isKnightHere ? <Knight/> : null

    return (
        <div key={i} style={{width: "12.5%", height: "3em"}}>
            <Square black={black}>{piece}</Square>
        </div>
    )
}

export default renderSquare;