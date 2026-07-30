import "./AdoptionCenters.css";
import ParentWideLayout from "../../layouts/ParentWideLayout";

import {
    HeroSection,
    GoogleMapSection,
    CentersGrid
} from "../../components/AdoptionCenters";

function AdoptionCenters() {

    return (

        <ParentWideLayout>

            <div className="adoption-centers-page">

                <HeroSection />

                <GoogleMapSection cityName="Pune" />

                <CentersGrid />

            </div>

        </ParentWideLayout>

    );

}

export default AdoptionCenters;