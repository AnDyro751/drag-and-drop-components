import {useRef} from 'react'
import {useDrag, useDrop} from "react-dnd";
import ItemTypes from "../../itemTypes";

export default function Card({text, id, index, moveCard}) {

    const ref = useRef(null)

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index; // INDEX DEL ITEM QUE SE ESTÁ ARRASTRANDO
            const hoverIndex = index; // INDEX DEL ITEM DEL ARRAY ORIGINAL

            // NO HACER NADA SI EL ITEM ARRASTRADO ES IGUAL AL ITEM QUE ESTÁ EN HOVER
            if (dragIndex === hoverIndex) {
                return;
            }

            // POSICIÓN DEL RECTANGULO DEL COMOPONENTE
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            // console.log("OUND", hoverBoundingReact);
            // SE DETERMINA LA POSICIÓN DEL ELEMENTO
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // DETERMINA LA POSICIÓN DEL MOUSE QUE SE ESTÁ ARRASTRANDO
            // const clientOffset = monitor.getClientOffset()
            // DETERMINA LOS PIXELES PARA TOPAR EL EJE Y
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // const hoverClientY = clientOffset.y - hoverBoundingReact.top;
            // SI AÚN NO ES SOBREPASA EL TAMAÑO DEL RECTUANGULO ENTONCES NO HACE NADA
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveCard(dragIndex,hoverIndex);

            item.index = hoverIndex;
        }
    })
    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.CARD, id, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref))
    return (
        <>
            <div ref={ref} className="main_card">{text}</div>
            <style jsx>{`
                .main_card{
                    margin-bottom: .5rem;
                    cursor: move;
                    opacity: ${opacity};
                    padding: 1em;
                    background: yellow;
                    border: 1px dashed #f44336;
                }
            `}</style>
        </>
    )
}
