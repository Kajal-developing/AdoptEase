import "./Cities.css";

import citiesData from "../../data/citiesData";
import CityCard from "./CityCard";

function CitiesGrid() {

    return (

        <section className="cities-container">

            <h1 className="cities-title">
                Select your city!!
            </h1>

            <div className="cities-grid">

                {citiesData.map((city) => (

                    <CityCard
                        key={city.id}
                        city={city}
                    />

                ))}

            </div>

        </section>

    );

}

export default CitiesGrid;