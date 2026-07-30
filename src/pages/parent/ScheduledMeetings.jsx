import "./ScheduledMeetings.css";

import ParentWideLayout from "../../layouts/ParentWideLayout";

import { MeetingsGrid } from "../../components/ScheduledMeetings";

function ScheduledMeetings() {

    return (

        <ParentWideLayout>

            <div className="scheduled-page">

                <div className="scheduled-header">

                    <h1>

                        Scheduled Meeting

                    </h1>

                </div>

                <MeetingsGrid />

            </div>

        </ParentWideLayout>

    );

}

export default ScheduledMeetings;