import "./ApprovalStatusCard.css";

function ApprovalStatusCard({ status = "PENDING" }) {

    return (

        <div className="approval-card">

            <h3>Approval Status</h3>

            <hr />

            <div className="approval-list">

                <div className="approval-item">

                    <span
                        className={`status-circle ${
                            status === "PENDING" ? "active pending" : ""
                        }`}
                    ></span>

                    <span className="status-text">
                        Pending
                    </span>

                </div>

                <div className="approval-item">

                    <span
                        className={`status-circle ${
                            status === "APPROVED" ? "active approved" : ""
                        }`}
                    ></span>

                    <span className="status-text">
                        Approved
                    </span>

                </div>

                <div className="approval-item">

                    <span
                        className={`status-circle ${
                            status === "REJECTED" ? "active rejected" : ""
                        }`}
                    ></span>

                    <span className="status-text">
                        Rejected
                    </span>

                </div>

            </div>

        </div>

    );

}

export default ApprovalStatusCard;