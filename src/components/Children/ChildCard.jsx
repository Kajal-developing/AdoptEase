import "./Children.css";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function ChildCard({ child }) {
    
    console.log(child);

    const navigate = useNavigate();

    const { city } = useParams();

    const handleMeeting = () => {

        if (child.availableStatus !== "AVAILABLE") return;

        navigate(
            `/book-meeting/${city}/${child.adoptionCenterId}/${child.childId}`
        );
    };

    const getStatusClass = () => {

        switch (child.availableStatus) {

            case "AVAILABLE":
                return "status-available";

            case "MEETING_BOOKED":
                return "status-reserved";

            case "ADOPTED":
                return "status-adopted";

            default:
                return "";
        }

    };

    return (

        <div className="child-card">

            <img
                src={`http://localhost:8080/images/children/${child.childPhoto}`}
                alt={child.childName}
                className="child-image"
            />

            <div className="child-info">

                <div className="child-header">

                    <h3>{child.childName}</h3>

                    <div className={`child-status ${getStatusClass()}`}>

                        <span className="status-dot"></span>

                        <span>{child.availableStatus}</span>

                    </div>

                </div>

                <div className="child-meta">

                    <div>

                        <span className="label">

                            Age :

                        </span>{" "}

                        <span className="child-value">

                            {child.age} yrs

                        </span>

                    </div>

                    <div>

                        {child.gender}

                    </div>

                </div>

                <div className="child-health">

                    <span className="label">

                        Health :

                    </span>{"   "}

                    <span className="child-value">

                        {child.healthStatus}

                    </span>

                </div>

                <p className="child-description">

                    {child.description}

                </p>

                <button
                    className="meeting-link"
                    disabled={child.availableStatus !== "AVAILABLE"}
                    onClick={handleMeeting}
                >

                    Set meeting

                    <ArrowRight size={15} />

                </button>

            </div>

        </div>

    );

}

export default ChildCard;