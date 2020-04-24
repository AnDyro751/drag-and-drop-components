import indexPage from '../../../json_pages/index'
import {useState, useEffect, useCallback} from 'react'
import Card from "../Card";
import update from "immutability-helper";


const Board = ({}) => {
    const [cards, setCards] = useState(indexPage.elements);
    useEffect(() => {
        console.log("CARDS", cards)
    }, [cards])

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(
                update(cards, {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
                })
            );
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
            />
        )
    }

    return (
        <div>{cards.map((card, i) => renderCard(card, i))}</div>
    )
}
export default Board;