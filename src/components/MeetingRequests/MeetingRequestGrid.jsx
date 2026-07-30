import MeetingRequestCard from "./MeetingRequestCard";

import meetingRequestsData from "../../data/meetingRequestsData";

import "../../pages/center/MeetingRequests.css";

function MeetingRequestGrid() {

    return (

        <section className="request-grid-section">

            <div className="request-grid">

                {meetingRequestsData.map((request) => (

                    <MeetingRequestCard
                        key={request.id}
                        request={request}
                    />

                ))}

            </div>

        </section>

    );

}

export default MeetingRequestGrid;