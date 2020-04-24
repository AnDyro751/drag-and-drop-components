import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Head from "next/head";
import Board from "../src/components/Board";

const IndexPage = () => (
    <>
        <Head>
            <title>Drag and Drop - Azachii Components</title>
        </Head>
        <DndProvider backend={Backend}>
            <Board
                knightPosition={[0, 0]}
            />
        </DndProvider>
    </>
)

export default IndexPage;