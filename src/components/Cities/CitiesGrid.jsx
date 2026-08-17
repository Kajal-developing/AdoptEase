import "./Cities.css";

import citiesData from "../../data/citiesData";
import CityCard from "./CityCard";
import { useNavigate, useSearchParams } from "react-router-dom";

function CitiesGrid() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const searchTerm =
        searchParams.get("search")?.toLowerCase().trim() || "";

    const handleCityClick = (slug) => {

        navigate(`/adoption-centers/${slug}`);

    };

    const filteredCities = citiesData.filter((city) => {

        return (
            city.name?.toLowerCase().includes(searchTerm) ||
            city.slug?.toLowerCase().includes(searchTerm)
        );

    });

    return (

        <section className="cities-container">

            <h1 className="cities-title">
                Select your city!!
            </h1>

            {filteredCities.length === 0 ? (

                <div className="requests-grid-message">

                    <h2>
                        No city found
                    </h2>

                    <p>
                        No city matches "{searchTerm}".
                    </p>

                </div>

            ) : (

                <div className="cities-grid">

                    {filteredCities.map((city) => (

                        <CityCard
                            key={city.id}
                            city={city}
                            onClick={() =>
                                handleCityClick(city.slug)
                            }
                        />

                    ))}

                </div>

            )}

        </section>

    );
}

export default CitiesGrid;