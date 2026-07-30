import "./Cities.css";

import { useNavigate } from "react-router-dom";

function CityCard({ city }) {

    const navigate = useNavigate();

    return (

        <div
            className="city-card"
            onClick={() => navigate(`/adoption-centers/${city.slug}`)}
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