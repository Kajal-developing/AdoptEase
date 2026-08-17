import "../../pages/parent/BookMeeting.css";

function ChildSummaryCard({ child }) {

    if (!child) {

        return null;

    }

    return (

        <section className="meeting-child-section">

            <div className="meeting-child-card">

                <img
                    src={`http://localhost:8080/images/children/${child.childPhoto}`}
                    alt={child.childName}
                    className="meeting-child-image"
                />

                <div className="meeting-child-content">

                    <h2>

                        {child.childName}

                    </h2>

                    <div className="meeting-child-details">

                        <p>

                            <strong>Age :</strong> {child.age} yrs

                        </p>

                        <p>

                            <strong>Gender :</strong> {child.gender}

                        </p>

                        <p>

                            <strong>Health :</strong> {child.healthStatus}

                        </p>

                        <p>

                            <strong>Status :</strong>

                            <span
                                className={`meeting-status ${child.availableStatus.toLowerCase()}`}
                            >

                                {child.availableStatus}

                            </span>

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default ChildSummaryCard;