import "./Cities.css";

function CityCard({
    city,
    onClick
}) {


    return (

        <div
            className="city-card"
            onClick={onClick}
        >

            <img
                src={city.image}
                alt={city.name}
                className="city-image"
            />

            <h3 className="city-name">

                {city.name}

            </h3>

            <span className="city-action">

                Select City →

            </span>

        </div>

    );

}

export default CityCard;