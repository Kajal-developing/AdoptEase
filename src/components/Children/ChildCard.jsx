import "./Children.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ChildCard({ child }) {

    const navigate = useNavigate();

    const handleMeeting = () => {

        if (child.status !== "Available") return;

        navigate(`/book-meeting/${child.id}`);

    };

    const getStatusClass = () => {

        switch (child.status) {

            case "Available":
                return "status-available";

            case "Reserved":
                return "status-reserved";

            case "Adopted":
                return "status-adopted";

            default:
                return "";
        }

    };

    return (

        <div className="child-card">

            <img
                src={child.image}
                alt={child.name}
                className="child-image"
            />

            <div className="child-info">

                <div className="child-header">

                    <h3>{child.name}</h3>

                    <div className={`child-status ${getStatusClass()}`}>

                        <span className="status-dot"></span>

                        <span>{child.status}</span>

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

                        {child.health}

                    </span>

                </div>

                <p className="child-description">

                    {child.description}

                </p>

                <button
                    className="meeting-link"
                    disabled={child.status !== "Available"}
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