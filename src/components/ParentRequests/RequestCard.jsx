import { useState } from "react";

import "./../../pages/admin/ParentRequests.css";

import RequestTable from "./RequestTable";
import ActionButtons from "./ActionButtons";

import {
    approveParent,
    rejectParent
} from "../../api/authApi";

function RequestCard({ parent, onProcessed }) {

    const [decision, setDecision] = useState("");

    const [remark, setRemark] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const [popup, setPopup] = useState({
        show: false,
        type: "",
        title: "",
        message: ""
    });

    const showPopup = (
        type,
        title,
        message
    ) => {

        setPopup({
            show: true,
            type,
            title,
            message
        });

    };

    const closePopup = () => {

        const wasSuccess =
            popup.type === "success";

        setPopup({
            show: false,
            type: "",
            title: "",
            message: ""
        });

        /*
         * Remove card AFTER user clicks OK
         */
        if (wasSuccess) {

            onProcessed(parent.userId);

        }

    };

    const handleSubmit = async () => {

        // No decision selected
        if (!decision) {

            showPopup(
                "error",
                "Action Required",
                "Please select Accept or Reject."
            );

            return;

        }

        /*
         * REJECT:
         * Remark is mandatory
         */
        if (
            decision === "rejected" &&
            !remark.trim()
        ) {

            showPopup(
                "error",
                "Remark Required",
                "Please enter a remark before rejecting the request."
            );

            return;

        }

        try {

            setSubmitting(true);

            /*
             * ==========================
             * ACCEPT
             * ==========================
             */

            if (decision === "accepted") {

                await approveParent(
                    parent.userId
                );

                showPopup(
                    "success",
                    "Success",
                    "Parent request accepted successfully."
                );

                return;

            }

            /*
             * ==========================
             * REJECT
             * ==========================
             */

            if (decision === "rejected") {

                await rejectParent(
                    parent.userId,
                    remark.trim()
                );

                showPopup(
                    "success",
                    "Success",
                    "Parent request rejected successfully."
                );

            }

        } catch (error) {

            console.error(
                "Parent request action failed:",
                error
            );

            showPopup(
                "error",
                "Request Failed",
                error.response?.data?.message ||
                "Unable to process the request. Please try again."
            );

        } finally {

            setSubmitting(false);

        }

    };

    return (

        <>

            <div className="request-card">

                <h2>
                    {parent.userName}
                </h2>

                <p className="request-location">
                    {parent.city?.toUpperCase()}
                </p>

                <RequestTable
                    parent={parent}
                />

                <div className="request-images">

                    <div className="request-image-box">

                        <img
                            src={
                                parent.familyPhoto
                                    ? `http://localhost:8080/images/parents/${parent.familyPhoto}`
                                    : "https://placehold.co/300x200?text=No+Family+Photo"
                            }
                            alt="Family"
                        />

                        <span>
                            Family Photo
                        </span>

                    </div>

                    <div className="request-image-box">

                        <img
                            src={
                                parent.housePhoto
                                    ? `http://localhost:8080/images/parents/${parent.housePhoto}`
                                    : "https://placehold.co/300x200?text=No+House+Photo"
                            }
                            alt="House"
                        />

                        <span>
                            House Photo
                        </span>

                    </div>

                </div>

                <ActionButtons

                    decision={decision}

                    setDecision={setDecision}

                    disabled={submitting}

                />

                <textarea
                    className="remark-box"

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
                        submitting ||
                        decision !== "rejected"
                    }

                />

                <button
                    type="button"
                    className="submit-btn"

                    onClick={handleSubmit}

                    disabled={submitting}
                >

                    {submitting
                        ? "Processing..."
                        : "Submit"
                    }

                </button>

            </div>


            {/* =========================
                POPUP
            ========================= */}

            {popup.show && (

                <div className="popup-overlay">

                    <div className="popup-box">

                        <div
                            className={`popup-icon ${popup.type}`}
                        >

                            {popup.type === "success"
                                ? "✓"
                                : "!"
                            }

                        </div>

                        <h3>
                            {popup.title}
                        </h3>

                        <p>
                            {popup.message}
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