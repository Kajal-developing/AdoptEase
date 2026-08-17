import "./AdoptionCenters.css";

import CenterCard from "./CenterCard";

function CentersGrid({ centers }) {

   
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