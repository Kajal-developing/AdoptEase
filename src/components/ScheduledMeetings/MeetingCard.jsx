import { useNavigate } from "react-router-dom";

import "../../pages/parent/ScheduledMeetings.css";

function MeetingCard({ meeting }) {

    const navigate = useNavigate();

    return (

        <div className="meeting-ticket">

            <div className="ticket-top">

                <img
                    src={meeting.image}
                    alt={meeting.childName}
                    className="ticket-image"
                />

                <div>

                    <h2>{meeting.childName}</h2>

                    <p className="ticket-age">
                        Age : {meeting.age} yrs
                    </p>

                </div>

            </div>

            <p className="ticket-center">

                {meeting.center}

            </p>

            <div className="meeting-slot">

                <span>{meeting.date}</span>

                <span>{meeting.time}</span>

            </div>

            <div className="ticket-action">

                {meeting.status === "Scheduled" && (

                    <span className="status scheduled">

                        Scheduled

                    </span>

                )}

                {meeting.status === "Pending" && (

                    <span className="status pending">

                        Request Pending

                    </span>

                )}

                {meeting.status === "Rejected" && (

                    <>

                        <span className="status rejected">

                            Rejected

                        </span>

                        <button
                            className="reschedule-btn"
                            onClick={() =>
                                navigate(`/book-meeting/${meeting.childId}`)
                            }
                        >

                            Reschedule

                        </button>

                    </>

                )}

            </div>

            <p className={`ticket-message ${meeting.status.toLowerCase()}`}>

                {meeting.message}

            </p>

        </div>

    );

}

export default MeetingCard;