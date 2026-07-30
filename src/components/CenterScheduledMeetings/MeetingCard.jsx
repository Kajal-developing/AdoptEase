import "../../pages/center/ScheduledMeetings.css";
import { useNavigate } from "react-router-dom";

function MeetingCard({ meeting }) {

    const navigate = useNavigate();

    return (

        <div className="center-meeting-card">

            <h2>

                {meeting.parentName}

            </h2>

            <p className="meeting-child">

                Meeting with

                <strong>

                    {" "}{meeting.childName}

                </strong>

            </p>

            <div className="meeting-date-box">

                <span>

                    {meeting.date}

                </span>

                <span>

                    {meeting.time}

                </span>

            </div>

            <div className="meeting-details">

                <p>

                    <strong>Child :</strong> {meeting.childName}

                </p>

                <p>

                    <strong>Age :</strong> {meeting.age} yrs

                </p>

                <p>

                    <strong>Location :</strong> {meeting.location}

                </p>

                <p>

                    <strong>Phone :</strong> {meeting.phone}

                </p>

            </div>

            <div className="meeting-footer">

                <span className={`meeting-status ${meeting.status.toLowerCase()}`}>

                    {meeting.status}

                </span>

                <button
                    className="view-details-btn"
                    onClick={() =>
                        navigate(`/center/meeting-details/${meeting.id}`)
                    }
                >

                    View Details

                </button>

            </div>

        </div>

    );

}

export default MeetingCard;