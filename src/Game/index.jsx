import React from 'react'
import {DndProvider} from 'react-dnd'
import Head from 'next/head'
import Board from '@components/Board'

const Component = ({name = "", title = ""}) => {
    return (<>
        <head className='popodeperro'>
            <h2 className=''>DEMO H</h2>
        </head>
        <div className='row u__no_margin'>
            <div className='col-xl-12 u__no_padding'>
                <div className='hero_banner'>
                    <p className='black_color_text'>POPODEPERRO JEJE</p>
                    <h2 className=''>
                        Hola
                        soy h2
                    </h2>
                </div>
            </div>
        </div>
    </>)
}
export default Component