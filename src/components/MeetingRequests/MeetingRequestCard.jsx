import { useState } from "react";

import "../../pages/center/MeetingRequests.css";

function MeetingRequestCard({ request }) {

    const [status, setStatus] = useState("");

    const [remarks, setRemarks] = useState("");

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {

        if (!status) {

            alert("Please select Accept or Reject.");

            return;

        }

        setSubmitted(true);

    };

    return (

        <div className="request-card">

            <h2>{request.parentName}</h2>

            <p className="request-location">

                {request.location}

            </p>

            <div className="request-slot">

                <span>{request.date}</span>

                <span>{request.time}</span>

            </div>

            <hr />

            <small>

                Scheduled meeting for

            </small>

            <h3>{request.childName}</h3>

            <p className="request-age">

                Age : {request.age} yrs

            </p>

            <div className="request-actions">

                <button

                    disabled={submitted}

                    className={
                        status === "Accepted"
                            ? "accept-btn active-accept"
                            : "accept-btn"
                    }

                    onClick={() => setStatus("Accepted")}

                >

                    Accept

                </button>

                <button

                    disabled={submitted}

                    className={
                        status === "Rejected"
                            ? "reject-btn active-reject"
                            : "reject-btn"
                    }

                    onClick={() => setStatus("Rejected")}

                >

                    Reject

                </button>

            </div>

            <textarea

                disabled={submitted}

                placeholder="Remark here..."

                value={remarks}

                onChange={(e) => setRemarks(e.target.value)}

            />

            {

                submitted ?

                    <div
                        className={
                            status === "Accepted"

                                ? "request-status accepted"

                                : "request-status rejected"
                        }
                    >

                        {status === "Accepted"

                            ? "Meeting Accepted"

                            : "Meeting Rejected"}

                    </div>

                    :

                    <button

                        className="submit-request-btn"

                        onClick={handleSubmit}

                    >

                        Submit

                    </button>

            }

        </div>

    );

}

export default MeetingRequestCard;