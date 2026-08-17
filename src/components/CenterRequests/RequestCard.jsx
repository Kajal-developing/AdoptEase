import { useState } from "react";

import "./../../pages/admin/CenterRequests.css";

import CenterInfo from "./CenterInfo";
import ActionButtons from "./ActionButtons";

import {
    approveCenter,
    rejectCenter
} from "../../api/authApi";

function RequestCard({ center, onDecision }) {

    const [decision, setDecision] = useState("");

    const [remark, setRemark] = useState("");

    const [submitted, setSubmitted] = useState(false);

    const [showPopup, setShowPopup] = useState(false);

    const [popupMessage, setPopupMessage] = useState("");

    const [popupType, setPopupType] = useState("success");

    const [processing, setProcessing] = useState(false);


    const showErrorPopup = (message) => {

        setPopupMessage(message);

        setPopupType("error");

        setShowPopup(true);

    };


    const handleSubmit = async () => {

        // No decision selected
        if (!decision) {

            showErrorPopup(
                "Please select Accept or Reject."
            );

            return;

        }


        // Reject requires remark
        if (
            decision === "rejected" &&
            !remark.trim()
        ) {

            showErrorPopup(
                "Please enter a remark before rejecting the request."
            );

            return;

        }


        try {

            setProcessing(true);


            // ==========================
            // ACCEPT
            // ==========================

            if (decision === "accepted") {

                await approveCenter(
                    center.centerId
                );

                setPopupMessage(
                    "Center request approved successfully."
                );

            }


            // ==========================
            // REJECT
            // ==========================

            if (decision === "rejected") {

                await rejectCenter(
                    center.centerId,
                    remark.trim()
                );

                setPopupMessage(
                    "Center request rejected successfully."
                );

            }


            setPopupType("success");

            setShowPopup(true);

            setSubmitted(true);


        } catch (error) {

            console.error(
                "Center request action failed:",
                error
            );

            setPopupMessage(
                error.response?.data?.message ||
                "Unable to process the request."
            );

            setPopupType("error");

            setShowPopup(true);

        } finally {

            setProcessing(false);

        }

    };


    const closePopup = () => {

        const wasSuccess =
            popupType === "success";

        setShowPopup(false);

        /*
         * Remove the center only after
         * user clicks OK on success popup.
         */
        if (wasSuccess) {

            onDecision();

        }

    };


    return (

        <>

            <div className="center-request-card">

                <h2>
                    {center.centerName}
                </h2>


                <p className="center-location">
                    {center.city?.toUpperCase()}
                </p>


                <CenterInfo
                    center={center}
                />


                <div className="center-details">

                    <img
                        src={
                            center.centerPhoto
                                ? `http://localhost:8080/images/centers/${center.centerPhoto}`
                                : "https://placehold.co/300x200?text=No+Photo"
                        }
                        alt={center.centerName}
                    />

                    <p>
                        {center.description}
                    </p>

                </div>


                <ActionButtons

                    decision={decision}

                    setDecision={setDecision}

                    disabled={
                        submitted ||
                        processing
                    }

                />


                <textarea

                    className="center-remark"

                    placeholder={
                        decision === "rejected"
                            ? "Enter reason for rejection..."
                            : "Remark here..."
                    }

                    value={remark}

                    onChange={(e) =>
                        setRemark(e.target.value)
                    }

                    disabled={
                        submitted ||
                        processing ||
                        decision !== "rejected"
                    }

                />


                <button

                    type="button"

                    className="center-submit-btn"

                    onClick={handleSubmit}

                    disabled={
                        submitted ||
                        processing
                    }

                >

                    {processing
                        ? "Processing..."
                        : submitted
                            ? "Submitted"
                            : "Submit"
                    }

                </button>

            </div>


            {/* =========================
                POPUP
            ========================= */}

            {showPopup && (

                <div className="popup-overlay">

                    <div className="popup-box">

                        <div
                            className={
                                popupType === "success"
                                    ? "popup-icon success"
                                    : "popup-icon error"
                            }
                        >

                            {popupType === "success"
                                ? "✓"
                                : "!"
                            }

                        </div>


                        <h3>

                            {popupType === "success"
                                ? "Success"
                                : "Attention"
                            }

                        </h3>


                        <p>
                            {popupMessage}
                        </p>


                        <button
                            type="button"
                            className="popup-ok-btn"
                            onClick={closePopup}
                        >

                            OK

                        </button>

                    </div>

                </div>

            )}

        </>

    );

}

export default RequestCard;