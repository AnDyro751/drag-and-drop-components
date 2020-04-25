import {useRef} from 'react';
import useDoubleClick from 'use-double-click';


export default function DoubleClick({parentClass = "", children}) {

    const buttonRef = useRef(null)

    useDoubleClick({
        onSingleClick: e => console.log(e, 'single click'),
        onDoubleClick: e => console.log(e, 'double click'),
        ref: buttonRef,
        latency: 250
    });

    return (
        <div
            className={`${parentClass} remove_all_user_select pointer`}
            ref={buttonRef}
        >
            {children}
        </div>
    )
}