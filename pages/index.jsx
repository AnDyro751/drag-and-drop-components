import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Knight from "../src/components/Knight";
import Head from "next/head";
import Square from "../src/components/Square";

const IndexPage = () => (
    <>
        <Head>
            <title>Drag and Drop - Azachii Components</title>
        </Head>
        <DndProvider backend={Backend}>
            <Square black>
                <Knight/>
            </Square>
        </DndProvider>
    </>
)

export default IndexPage;