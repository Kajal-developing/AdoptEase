import { useState } from "react";
import {
    cancelMeeting,
    rescheduleMeeting
} from "../../api/authApi";

import "../../pages/parent/ScheduledMeetings.css";

function MeetingCard({ meeting, onCancelled, onRescheduled }) {

    const [showCancelPopup, setShowCancelPopup] =
        useState(false);

    const [showReschedulePopup, setShowReschedulePopup] =
        useState(false);

    const [isCancelling, setIsCancelling] =
        useState(false);

    const [isRescheduling, setIsRescheduling] =
        useState(false);

    const [rescheduleData, setRescheduleData] = useState({
        meetingDate: "",
        meetingTime: "",
        parentRemarks: ""
    });

    const canCancel =
        meeting.meetingStatus === "PENDING" ||
        meeting.meetingStatus === "REJECTED";


    // ==============================
    // CANCEL MEETING
    // ==============================

    const handleCancel = async () => {

        try {

            setIsCancelling(true);

            await cancelMeeting(meeting.meetingId);

            setShowCancelPopup(false);

            if (onCancelled) {
                onCancelled(meeting.meetingId);
            }

        }
        catch (error) {

            console.error(
                "Cancel Meeting Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to cancel meeting."
            );

        }
        finally {

            setIsCancelling(false);

        }

    };


    // ==============================
    // RESCHEDULE
    // ==============================

    const handleRescheduleChange = (e) => {

        const { name, value } = e.target;

        setRescheduleData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    const handleReschedule = async () => {

        if (!rescheduleData.meetingDate) {

            alert("Please select a meeting date.");

            return;

        }

        if (!rescheduleData.meetingTime) {

            alert("Please select a meeting time.");

            return;

        }

        try {

            setIsRescheduling(true);

            const response = await rescheduleMeeting(
                meeting.meetingId,
                rescheduleData
            );

            console.log(
                "Reschedule Response:",
                response.data
            );

            setShowReschedulePopup(false);

            setRescheduleData({
                meetingDate: "",
                meetingTime: "",
                parentRemarks: ""
            });

            // Update the meeting in parent component
            if (onRescheduled) {

                onRescheduled(
                    meeting.meetingId,
                    {
                        ...meeting,
                        meetingDate:
                            rescheduleData.meetingDate,

                        meetingTime:
                            rescheduleData.meetingTime,

                        meetingStatus: "PENDING",

                        centerRemarks: ""
                    }
                );

            }

        }
        catch (error) {

            console.error(
                "Reschedule Meeting Error:",
                error
            );

            console.error(
                "Response:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to reschedule meeting."
            );

        }
        finally {

            setIsRescheduling(false);

        }

    };


    // Tomorrow because backend uses @Future on LocalDate
    const tomorrow = new Date();

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );

    const minDate =
        tomorrow.toISOString().split("T")[0];


    return (

        <>

            <div className="meeting-ticket">

                {/* CANCEL CROSS */}

                {canCancel && (

                    <button
                        className="cancel-ticket-btn"
                        onClick={() =>
                            setShowCancelPopup(true)
                        }
                        title="Cancel meeting"
                    >
                        ×
                    </button>

                )}


                {/* CHILD INFORMATION */}

                <div className="ticket-top">

                    <img
                        src={
                            meeting.childPhoto
                                ? `http://localhost:8080/images/children/${meeting.childPhoto}`
                                : "https://placehold.co/150x150?text=No+Photo"
                        }
                        alt={meeting.childName}
                        className="ticket-image"
                    />

                    <div>

                        <h2>
                            {meeting.childName}
                        </h2>

                        <p className="ticket-age">
                            Age : {meeting.age} yrs
                        </p>

                    </div>

                </div>


                {/* CENTER */}

                <p className="ticket-center">

                    {meeting.adoptionCenterName}

                </p>


                {/* MEETING DATE + TIME */}

                <div className="meeting-slot">

                    <span>
                        {meeting.meetingDate}
                    </span>

                    <span>

                        {
                            new Date(
                                `1970-01-01T${meeting.meetingTime}`
                            ).toLocaleTimeString(
                                "en-US",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true
                                }
                            ).toUpperCase()

                        }

                    </span>

                </div>


                {/* STATUS */}

                <div className="ticket-action">

                    {meeting.meetingStatus === "APPROVED" && (

                        <span className="status scheduled">

                            Scheduled

                        </span>

                    )}


                    {meeting.meetingStatus === "PENDING" && (

                        <span className="status pending">

                            Request Pending

                        </span>

                    )}


                    {meeting.meetingStatus === "REJECTED" && (

                        <>

                            <span className="status rejected">

                                Rejected

                            </span>

                            <button
                                className="reschedule-btn"
                                onClick={() =>
                                    setShowReschedulePopup(true)
                                }
                            >

                                Reschedule

                            </button>

                        </>

                    )}

                </div>


                {/* CENTER REMARK */}

                <p
                    className={`ticket-message ${
                        meeting.meetingStatus.toLowerCase()
                    }`}
                >

                    {meeting.centerRemarks}

                </p>

            </div>


            {/* =====================================
                CANCEL POPUP
            ===================================== */}

            {showCancelPopup && (

                <div className="cancel-popup-overlay">

                    <div className="cancel-popup">

                        <button
                            className="cancel-popup-close"
                            onClick={() =>
                                setShowCancelPopup(false)
                            }
                        >
                            ×
                        </button>

                        <h2>
                            Cancel Meeting?
                        </h2>

                        <p>
                            Are you sure you want to cancel
                            this meeting ticket?
                        </p>

                        <div className="cancel-popup-actions">

                            <button
                                className="cancel-no-btn"
                                onClick={() =>
                                    setShowCancelPopup(false)
                                }
                                disabled={isCancelling}
                            >

                                No

                            </button>

                            <button
                                className="cancel-yes-btn"
                                onClick={handleCancel}
                                disabled={isCancelling}
                            >

                                {isCancelling
                                    ? "Cancelling..."
                                    : "Yes, Cancel"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* =====================================
                RESCHEDULE POPUP
            ===================================== */}

            {showReschedulePopup && (

                <div className="reschedule-popup-overlay">

                    <div className="reschedule-popup">

                        {/* CLOSE */}

                        <button
                            className="reschedule-popup-close"
                            onClick={() =>
                                setShowReschedulePopup(false)
                            }
                        >
                            ×
                        </button>


                        <h2>
                            Reschedule Meeting
                        </h2>

                        <p className="reschedule-description">

                            Select a new date and time for
                            your meeting.

                        </p>


                        {/* DATE */}

                        <div className="reschedule-field">

                            <label>
                                New Meeting Date
                            </label>

                            <input
                                type="date"
                                name="meetingDate"
                                value={
                                    rescheduleData.meetingDate
                                }
                                min={minDate}
                                onChange={
                                    handleRescheduleChange
                                }
                            />

                        </div>


                        {/* TIME */}

                        <div className="reschedule-field">

                            <label>
                                New Meeting Time
                            </label>

                            <input
                                type="time"
                                name="meetingTime"
                                value={
                                    rescheduleData.meetingTime
                                }
                                onChange={
                                    handleRescheduleChange
                                }
                            />

                        </div>


                        {/* REMARK */}

                        <div className="reschedule-field">

                            <label>
                                Remark
                            </label>

                            <textarea
                                name="parentRemarks"
                                value={
                                    rescheduleData.parentRemarks
                                }
                                onChange={
                                    handleRescheduleChange
                                }
                                placeholder="Enter a remark (optional)..."
                                rows="3"
                            />

                        </div>


                        {/* BUTTONS */}

                        <div className="reschedule-popup-actions">

                            <button
                                className="reschedule-cancel-btn"
                                onClick={() =>
                                    setShowReschedulePopup(false)
                                }
                                disabled={isRescheduling}
                            >

                                Cancel

                            </button>

                            <button
                                className="reschedule-submit-btn"
                                onClick={handleReschedule}
                                disabled={isRescheduling}
                            >

                                {isRescheduling
                                    ? "Rescheduling..."
                                    : "Confirm Reschedule"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}

export default MeetingCard;