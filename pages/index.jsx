import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Knight from "../src/components/Knight";
import Head from "next/head";
import Square from "../src/components/Square";
import Board from "../src/components/Board";

const IndexPage = () => (
    <>
        <Head>
            <title>Drag and Drop - Azachii Components</title>
        </Head>
        <DndProvider backend={Backend}>
            <Board/>
        </DndProvider>
    </>
)

export default IndexPage;