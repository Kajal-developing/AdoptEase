import meetingDetailsData from "../../data/meetingDetailsData";

import "../../pages/center/MeetingDetails.css";

function ChildInformation() {

    const { child } = meetingDetailsData;

    return (

        <div className="details-card">

            <h2>

                Child Information

            </h2>

            <div className="details-grid">

                <div>

                    <label>Name</label>

                    <p>{child.name}</p>

                </div>

                <div>

                    <label>Age</label>

                    <p>{child.age} Years</p>

                </div>

                <div>

                    <label>Gender</label>

                    <p>{child.gender}</p>

                </div>

                <div>

                    <label>Medical Notes</label>

                    <p>{child.medicalNotes}</p>

                </div>

            </div>

        </div>

    );

}

export default ChildInformation;