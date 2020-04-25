import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Head from "next/head";
import Board from "../src/components/Board";

const IndexPage = () => (
    <>
        <Head>
            <title>Drag and Drop - Azachii Components</title>
        </Head>
        <div className="row no_margin">
            <div className="col-xs-2 no_padding">
                <DndProvider backend={Backend}>
                    <Board
                    />
                </DndProvider>
            </div>
        </div>
    </>
)

export default IndexPage
