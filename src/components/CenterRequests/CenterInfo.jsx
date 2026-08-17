import "./../../pages/admin/CenterRequests.css";

function CenterInfo({ center }) {

    return (

        <div className="center-info">

            <div>

                <span className="info-title">
                    License Number
                </span>

                <p>
                    {center.licenseNo}
                </p>

            </div>

            <div>

                <span className="info-title">
                    Contact Number
                </span>

                <p>
                    +91 {center.contactNo}
                </p>

            </div>

        </div>

    );

}

export default CenterInfo;