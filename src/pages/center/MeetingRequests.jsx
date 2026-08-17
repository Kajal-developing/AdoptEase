import "./MeetingRequests.css";
import CenterLayout from "../../layouts/CenterLayout";
import { MeetingRequestGrid } from "../../components/MeetingRequests";

function MeetingRequests() {

    return (

        <CenterLayout>

            <div className="meeting-request-page">

                <div className="meeting-request-header">

                    <h1>

                        Request Meetings

                    </h1>

                </div>

                <MeetingRequestGrid />

            </div>

        </CenterLayout>

    );

}

export default MeetingRequests;