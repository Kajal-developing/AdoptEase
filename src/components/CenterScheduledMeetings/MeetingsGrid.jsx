import MeetingCard from "./MeetingCard";

import centerMeetingsData from "../../data/centerMeetingsData";

import "../../pages/center/ScheduledMeetings.css";

function MeetingsGrid() {

    return (

        <section className="center-meeting-grid-section">

            <div className="center-meeting-grid">

                {centerMeetingsData.map((meeting) => (

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