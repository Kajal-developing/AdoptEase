import "./AdoptionCenters.css";
import ParentWideLayout from "../../layouts/ParentWideLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCentersByCity } from "../../api/authApi";
import {
    HeroSection,
    GoogleMapSection,
    CentersGrid
} from "../../components/AdoptionCenters";

function AdoptionCenters() {

    const { city } = useParams();

    const cityMap = {

        pune: "Pune",

        mumbai: "Mumbai",

        sambhajinagar: "Ch. Sambhajinagar",

        delhi: "Delhi"

    };

    const selectedCity = cityMap[city];

    const [centers, setCenters] = useState([]);

    useEffect(() => {

        if (!selectedCity) return;

        const fetchCenters = async () => {

            try {

                const response =
                    await getCentersByCity(selectedCity);

                setCenters(response.data);

            }

            catch (error) {

                alert("Unable to load adoption centers.");

            }

        };

        fetchCenters();

    }, [selectedCity]);

    return (

        <ParentWideLayout>

            <div className="adoption-centers-page">

                <HeroSection city={city} />

                <GoogleMapSection
                    cityName={selectedCity}
                    centers={centers}
                />

                <CentersGrid centers={centers} />

            </div>

        </ParentWideLayout>

    );

}

export default AdoptionCenters;