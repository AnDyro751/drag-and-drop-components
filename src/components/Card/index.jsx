import {useRef} from 'react'
import {useDrag, useDrop} from "react-dnd";
import ItemTypes from "../../itemTypes";
import DoubleClick from "../DoubleClick";

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

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    })
    const [{isDragging}, drag, preview] = useDrag({
        item: {type: ItemTypes.CARD, id, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    const opacity = isDragging ? 0 : 1;
    return (
        <>
            <div
                ref={preview(drop(ref))}
                className="main_card row no_margin middle-xs">
                <div ref={drag} className="col-xs main_box_handle">
                    <div
                        className="main_handle"
                    />
                </div>
                <DoubleClick parentClass="col-xs small_padding_vertical">
                    {text}
                </DoubleClick>
            </div>
            <style jsx>{`
                .main_handle{
                    height: 1em;
                    width: 1em;
                    max-width: 1em;
                    max-height: 1em;
                    background: red;
                    cursor: move;
                }
                .main_box_handle{
                    height: 2em;
                    width: 2em;
                    max-width: 2em;
                    max-height: 2em;
                    display: flex;
                    align-items: center;
                }
                .main_card{
                    opacity: ${opacity};
                    background: yellow;
                    border: 1px dashed #f44336;
                    margin-bottom: .5em !important;
                }
            `}</style>
        </>
    )
}
