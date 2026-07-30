import "./ParentProfile.css";

import {
    FileText,
    BadgeCheck
} from "lucide-react";

function DocumentsCard() {

    const documents = [
        {
            name: "Aadhaar Card",
            status: "Uploaded"
        },
        {
            name: "PAN Card",
            status: "Uploaded"
        },
        {
            name: "Income Certificate",
            status: "Uploaded"
        },
        {
            name: "Marriage Certificate",
            status: "Uploaded"
        }
    ];

    return (

        <section className="profile-card">

            <h2 className="card-title">

                Documents

            </h2>

            <div className="documents-grid">

                {documents.map((doc, index) => (

                    <div
                        key={index}
                        className="document-card"
                    >

                        <div className="document-left">

                            <FileText
                                size={30}
                                className="document-icon"
                            />

                            <div>

                                <h3>{doc.name}</h3>

                                <p>Verified Document</p>

                            </div>

                        </div>

                        <span className="document-status">

                            <BadgeCheck size={18} />

                            {doc.status}

                        </span>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default DocumentsCard;