import { useState } from "react";

import {
    approveCenterMeeting,
    rejectCenterMeeting
} from "../../api/authApi";

import "../../pages/center/MeetingRequests.css";

function MeetingRequestCard({ request, onClear }) {

    const [status, setStatus] = useState("");

    const [remarks, setRemarks] = useState("");

    const [submitted, setSubmitted] = useState(false);

    const [loading, setLoading] = useState(false);

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const [showClearPopup, setShowClearPopup] = useState(false);

    const [remarksError, setRemarksError] = useState("");

    const handleSubmit = async () => {

        if (!status) {

            alert("Please select Accept or Reject.");

            return;

        }

        // Clear previous error
        setRemarksError("");

        // Rejection requires remarks
        if (status === "Rejected" && !remarks.trim()) {

            setRemarksError("Rejection reason is required.");

            return;

        }

        try {

            setLoading(true);

            if (status === "Accepted") {

                await approveCenterMeeting(
                    request.meetingId,
                    {
                        centerRemarks: remarks
                    }
                );

            }
            else {

                await rejectCenterMeeting(
                    request.meetingId,
                    {
                        centerRemarks: remarks
                    }
                );

            }

            setSubmitted(true);

            setShowSuccessPopup(true);

        }
        catch (error) {

            console.error(
                "Meeting Action Error:",
                error
            );

            console.error(
                "Response:",
                error.response?.data
            );

            setRemarksError(
                error.response?.data?.message ||
                "Unable to process meeting request."
            );

        }
        finally {

            setLoading(false);

        }

    };


    const handleClearTicket = () => {

        setShowClearPopup(false);

        if (onClear) {

            onClear(request.meetingId);

        }

    };


    return (

        <>

            <div className="request-card">

                {/* CROSS BUTTON */}

                {submitted && (

                    <button

                        className="clear-ticket-btn"

                        onClick={() =>
                            setShowClearPopup(true)
                        }

                        title="Clear ticket"

                    >

                        ×

                    </button>

                )}


                <h2>
                    {request.parentName}
                </h2>


                <p className="request-location">

                    {request.parentAddress}

                </p>


                <div className="request-slot">

                    <span>
                        {request.meetingDate}
                    </span>

                    <span>
                        {request.meetingTime}
                    </span>

                </div>


                <hr />


                <small>
                    Scheduled meeting for
                </small>


                <h3>
                    {request.childName}
                </h3>


                <p className="request-age">

                    Age : {request.age} yrs

                </p>


                <div className="request-actions">

                    <button

                        disabled={submitted || loading}

                        className={
                            status === "Accepted"
                                ? "accept-btn active-accept"
                                : "accept-btn"
                        }

                        onClick={() =>
                            setStatus("Accepted")
                        }

                    >

                        Accept

                    </button>


                    <button

                        disabled={submitted || loading}

                        className={
                            status === "Rejected"
                                ? "reject-btn active-reject"
                                : "reject-btn"
                        }

                        onClick={() =>
                            setStatus("Rejected")
                        }

                    >

                        Reject

                    </button>

                </div>


                <textarea
                    disabled={submitted || loading}
                    placeholder="Remark here..."
                    value={remarks}
                    onChange={(e) => {
                        setRemarks(e.target.value);

                        if (remarksError) {
                            setRemarksError("");
                        }
                    }}
                />

                {remarksError && (

                    <p className="remarks-error">
                        {remarksError}
                    </p>

                )}


                {submitted ? (

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

                ) : (

                    <button

                        className="submit-request-btn"

                        onClick={handleSubmit}

                        disabled={loading}

                    >

                        {loading
                            ? "Submitting..."
                            : "Submit"
                        }

                    </button>

                )}

            </div>


            {/* SUCCESS POPUP */}

            {showSuccessPopup && (

                <div className="meeting-success-overlay">

                    <div className="meeting-success-popup">

                        <div className="success-icon">
                            ✓
                        </div>


                        <h2>

                            {status === "Accepted"
                                ? "Meeting Accepted"
                                : "Meeting Rejected"}

                        </h2>


                        <p>

                            {status === "Accepted"

                                ? "The meeting has been successfully accepted."

                                : "The meeting has been successfully rejected."

                            }

                        </p>


                        <button

                            className="success-popup-btn"

                            onClick={() =>
                                setShowSuccessPopup(false)
                            }

                        >

                            OK

                        </button>

                    </div>

                </div>

            )}


            {/* CLEAR TICKET CONFIRMATION POPUP */}

            {showClearPopup && (

                <div className="clear-ticket-overlay">

                    <div className="clear-ticket-popup">

                        <div className="clear-warning-icon">
                            !
                        </div>


                        <h2>
                            Clear Ticket?
                        </h2>


                        <p>
                            Are you sure you want to clear this ticket?
                        </p>


                        <div className="clear-ticket-buttons">

                            <button

                                className="keep-ticket-btn"

                                onClick={() =>
                                    setShowClearPopup(false)
                                }

                            >

                                No, Keep Ticket

                            </button>


                            <button

                                className="confirm-clear-btn"

                                onClick={handleClearTicket}

                            >

                                Yes, Clear Ticket

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}

export default MeetingRequestCard;