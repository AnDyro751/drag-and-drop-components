import {useState, useEffect, useCallback} from 'react'
import Card from "../Card";
import update from "immutability-helper";


const Board = ({pageCards = [], setNewCards}) => {
    const [cards, setCards] = useState(pageCards);

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            let uc = update(cards, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
            })
            setCards(
                uc
            );
            // console.log("CARDS", uc)
            setNewCards(uc)
        },
        [cards]
    );


    const renderCard = (card, index) => {
        return (
            <Card
                moveCard={moveCard}
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                card={card}
            />
        )
    }

    return (
        <div>{cards.map((card, i) => renderCard(card, i))}</div>
    )
}
export default Board;