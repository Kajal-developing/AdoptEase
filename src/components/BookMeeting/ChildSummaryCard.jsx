import { useParams } from "react-router-dom";

import childrenData from "../../data/childrenData";

import "../../pages/parent/BookMeeting.css";

function ChildSummaryCard() {

    const { childId } = useParams();

    const child = childrenData.find(

        item => item.id === Number(childId)

    );

    if (!child) {

        return null;

    }

    return (

        <section className="meeting-child-section">

            <div className="meeting-child-card">

                <img
                    src={child.image}
                    alt={child.name}
                    className="meeting-child-image"
                />

                <div className="meeting-child-content">

                    <h2>

                        {child.name}

                    </h2>

                    <div className="meeting-child-details">

                        <p>

                            <strong>Age :</strong> {child.age} yrs

                        </p>

                        <p>

                            <strong>Gender :</strong> {child.gender}

                        </p>

                        <p>

                            <strong>Health :</strong> {child.health}

                        </p>

                        <p>

                            <strong>Status :</strong>

                            <span className={`meeting-status ${child.status.toLowerCase()}`}>

                                {child.status}

                            </span>

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default ChildSummaryCard;