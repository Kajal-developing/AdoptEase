import { useNavigate } from "react-router-dom";
import "./ProcedureCard.css";

function ProcedureCard({ onClick }) {

    const navigate = useNavigate();

    const handleClick = () => {

        if (onClick) {
            onClick();
            return;
        }

        navigate("/adoption-procedure");
    };

    return (

        <div className="procedure-card">

            <p className="procedure-text">
                Every Child deserves a loving home, and every parent's journey is unique.
                AdoptEase is here to make that journey simpler...
            </p>

            <button
                className="procedure-link"
                onClick={handleClick}
            >
                Read Adoption Procedure
                <span>→</span>
            </button>

        </div>

    );

}

export default ProcedureCard;