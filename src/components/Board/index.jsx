import renderSquare from "../renderSquare";

const Board = ({knightPosition}) => {
    const squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPosition))
    }
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            {squares}
        </div>
    )
}
export default Board;