import meetingDetailsData from "../../data/meetingDetailsData";

import "../../pages/center/MeetingDetails.css";

function UploadedDocuments() {

    const { documents } = meetingDetailsData;

    return (

        <div className="details-card">

            <h2>

                Uploaded Documents

            </h2>

            <div className="documents-list">

                {documents.map((document, index) => (

                    <div
                        key={index}
                        className="document-card"
                    >

                        <div>

                            <h4>

                                📄 {document}

                            </h4>

                        </div>

                        <button
                            className="view-document-btn"
                        >

                            View

                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default UploadedDocuments;