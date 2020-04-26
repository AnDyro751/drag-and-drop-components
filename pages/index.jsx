import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Head from "next/head";
import Board from "@components/Board";
import GetComponents from "@components/GetComponents";
import indexPage from '../json_pages/index'
import {useEffect} from "react";

const IndexPage = () => {
    const [pageCards, setPageCards] = React.useState(indexPage.elements || [])

    const handleUpdatePage = (cards) => {
        setPageCards([...cards])
    }

    useEffect(()=>{
        console.log("HOLA")
    },[])

    return (
        <>
            <Head>
                <title>Drag and Drop - Azachii Components</title>
            </Head>
            <DndProvider backend={Backend}>
                <div className="row no_margin between-xs">
                    <div className="col-xs-2 no_padding">
                        <Board
                            setNewCards={handleUpdatePage}
                            pageCards={indexPage.elements}
                        />
                    </div>
                    <div className="col-xs-9 no_padding">
                        <GetComponents
                            elements={pageCards}
                        />
                    </div>
                </div>
            </DndProvider>
        </>
    )
}

export default IndexPage
