const GetComponents = ({elements = []}) => {
    console.log("JAsjanjsna", elements)
    return (
        <div className="row no_margin">
            <div className="col-xs-12 no_padding">
                {elements.map((element, i) => {
                    if (element.component) {
                        switch (element.component.name) {
                            case "Banner":
                                return <h2 key={i}>{element.component.props.text.value}</h2>
                        }
                    } else {
                        return (<p>NO HAY</p>)
                    }
                })}
            </div>
        </div>
    )
}

export default GetComponents