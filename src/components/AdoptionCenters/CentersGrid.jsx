import "./AdoptionCenters.css";
import { useParams } from "react-router-dom";

import adoptionCentersData from "../../data/adoptionCentersData";
import CenterCard from "./CenterCard";

function CentersGrid() {

    const { city } = useParams();

    const centers = adoptionCentersData.filter(
        center => center.city === city
    );

    return (

        <section className="centers-section">

            <div className="centers-grid">

                {centers.map(center => (

                    <CenterCard
                        key={center.id}
                        center={center}
                    />

                ))}

            </div>

        </section>

    );

}

export default CentersGrid;