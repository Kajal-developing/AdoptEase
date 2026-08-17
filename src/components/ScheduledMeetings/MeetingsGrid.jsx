import MeetingCard from "./MeetingCard";

import "../../pages/parent/ScheduledMeetings.css";

function MeetingsGrid({
    meetings,
    onMeetingCancelled,
    onMeetingRescheduled
}) {

    if (meetings.length === 0) {

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

                {meetings.map((meeting) => (

                    <MeetingCard

                        key={meeting.meetingId}

                        meeting={meeting}

                        onCancelled={
                            onMeetingCancelled
                        }

                        onRescheduled={
                            onMeetingRescheduled
                        }

                    />

                ))}

            </div>

        </section>

    );
}

export default MeetingsGrid;