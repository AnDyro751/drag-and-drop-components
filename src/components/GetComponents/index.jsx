import Components from "./importer";

const GetComponents = ({elements = []}) => {
    console.log("JAsjanjsna", elements)
    return (
        <div className="row no_margin">
            <div className="col-xs-12 no_padding">
                {elements.map((element, i) => {
                    const Component = Components[element.component.name]
                    return React.createElement(Component, {key: i, data: element.component.props || []})
                })}
            </div>
        </div>
    )
}

export default GetComponents