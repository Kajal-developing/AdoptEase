import "./AdoptionCenters.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CenterCard({ center }) {

    const navigate = useNavigate();

    return (

        <div className="center-card">

            <img
                src={center.image}
                alt={center.name}
                className="center-image"
            />

            <div className="center-content">

                <h3>{center.name}</h3>

                <p className="center-address">

                    {center.address}

                </p>

                <p className="center-description">

                    {center.description}

                </p>

                <button
                    className="view-btn"
                    onClick={() => navigate(`/children/${center.id}`)}
                >
                    <span>See Children</span>
                    <ArrowRight size={18} />
                </button>

            </div>

        </div>

    );

}

export default CenterCard;