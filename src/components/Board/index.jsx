import indexPage from '../../../json_pages/index'
import {useState, useEffect} from 'react'
import Card from "../Card";

const Board = ({knightPosition}) => {
    const [cards, setCards] = useState(indexPage.elements);
    useEffect(() => {
        console.log("CARDS", cards)
    }, [])

    const renderCard = (card, i) => {
        return (
            <Card
                key={i}
                index={i}
                id={card.id}
                text={card.text}
            />
        )
    }

    return (
        <div>{cards.map((card, i) => renderCard(card, i))}</div>
    )
}
export default Board;