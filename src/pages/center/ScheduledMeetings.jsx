import "./ScheduledMeetings.css";

import CenterLayout from "../../layouts/CenterLayout";

import { MeetingsGrid } from "../../components/CenterScheduledMeetings";

function ScheduledMeetings() {

    return (

        <CenterLayout>

            <div className="center-meeting-page">

                <div className="center-meeting-header">

                    <h1>

                        Scheduled Meetings

                    </h1>

                </div>

                <MeetingsGrid />

            </div>

        </CenterLayout>

    );

}

export default ScheduledMeetings;