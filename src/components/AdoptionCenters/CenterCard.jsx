import "./AdoptionCenters.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CenterCard({ center }) {

    const navigate = useNavigate();

    const citySlug = {
        "PUNE": "pune",
        "MUMBAI": "mumbai",
        "CH. SAMBHAJINAGAR": "sambhajinagar",
        "DELHI": "delhi"
    }[center.city];

    return (

        <div className="center-card">

            <img
                src={
                    center.centerPhoto
                        ? `http://localhost:8080/images/centers/${center.centerPhoto}`
                        : `http://localhost:8080/images/centers/default-center.jpg`
                }
                alt={center.centerName}
                className="center-image"
            />

            <div className="center-content">

                <h3>{center.centerName}</h3>

                <p className="center-address">
                    {center.address}
                </p>

                <p className="center-description">
                    {center.description}
                </p>

                <button
                    className="see-children-link"
                    onClick={() =>
                        navigate(
                            `/children/${center.city.toLowerCase()}/${center.centerId}`
                        )
                    }
                >
                    <span>See Children</span>
                    <ArrowRight size={18} />
                </button>

            </div>

        </div>

    );

}

export default CenterCard;