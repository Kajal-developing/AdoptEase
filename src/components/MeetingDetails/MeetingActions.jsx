import { useState } from "react";

import "../../pages/center/MeetingDetails.css";

function MeetingActions() {

    const [remarks, setRemarks] = useState("");

    const [status, setStatus] = useState("Scheduled");

    const handleSave = () => {

        alert("Meeting details saved successfully.");

    };

    const handleComplete = () => {

        setStatus("Completed");

    };

    const handleCancel = () => {

        setStatus("Cancelled");

    };

    return (

        <div className="details-card">

            <h2>

                Meeting Actions

            </h2>

            <div className="meeting-action-section">

                <label>

                    Meeting Remarks

                </label>

                <textarea

                    placeholder="Write meeting remarks here..."

                    value={remarks}

                    onChange={(e) => setRemarks(e.target.value)}

                />

                <div className="meeting-status-box">

                    <strong>

                        Current Status :

                    </strong>

                    <span className={`status-badge ${status.toLowerCase()}`}>

                        {status}

                    </span>

                </div>

                <div className="meeting-buttons">

                    <button

                        className="complete-btn"

                        onClick={handleComplete}

                    >

                        Mark as Completed

                    </button>

                    <button

                        className="cancel-btn"

                        onClick={handleCancel}

                    >

                        Cancel Meeting

                    </button>

                    <button

                        className="save-btn"

                        onClick={handleSave}

                    >

                        Save Changes

                    </button>

                </div>

            </div>

        </div>

    );

}

export default MeetingActions;