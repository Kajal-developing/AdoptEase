import meetingDetailsData from "../../data/meetingDetailsData";

import "../../pages/center/MeetingDetails.css";

function ParentInformation() {

    const { parent } = meetingDetailsData;

    return (

        <div className="details-card">

            <h2>

                Parent Information

            </h2>

            <div className="details-grid">

                <div>

                    <label>Name</label>

                    <p>{parent.name}</p>

                </div>

                <div>

                    <label>Email</label>

                    <p>{parent.email}</p>

                </div>

                <div>

                    <label>Phone</label>

                    <p>{parent.phone}</p>

                </div>

                <div>

                    <label>Address</label>

                    <p>{parent.address}</p>

                </div>

            </div>

        </div>

    );

}

export default ParentInformation;