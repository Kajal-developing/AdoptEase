import MeetingCard from "./MeetingCard";
import meetingData from "../../data/meetingData";
import "../../pages/parent/ScheduledMeetings.css";

function MeetingsGrid() {

    if (meetingData.length === 0) {

        return (

            <div className="empty-meetings">

                <h2>No Scheduled Meetings</h2>

                <p>

                    You haven't scheduled any meetings yet.

                </p>

            </div>

        );

    }

    return (

        <section className="meetings-grid-section">

            <div className="meetings-grid">

                {meetingData.map((meeting) => (

                    <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                    />

                ))}

            </div>

        </section>

    );

}

export default MeetingsGrid;