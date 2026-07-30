import "./MeetingDetails.css";
import CenterLayout from "../../layouts/CenterLayout";

import {
    ParentInformation,
    ChildInformation,
    UploadedDocuments,
    MeetingActions
} from "../../components/MeetingDetails";

function MeetingDetails() {

    return (

        <CenterLayout>

            <div className="meeting-details-page">

                <h1 className="meeting-details-title">

                    Meeting Details

                </h1>

                <ParentInformation />

                <ChildInformation />

                <UploadedDocuments />

                <MeetingActions />

            </div>

        </CenterLayout>

    );

}

export default MeetingDetails;