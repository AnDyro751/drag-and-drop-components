const ClassicEnBanner = ({data: {mainImage = "", text: {color = "black", className = "", value = "", fontSize = "1em"}}}) => {
    return (
        <div
            className="row no_margin"
        >
            <div className="col-xl-12 no_padding">
                <h3>{value}</h3>
            </div>
        </div>
    )
}


export default ClassicEnBanner