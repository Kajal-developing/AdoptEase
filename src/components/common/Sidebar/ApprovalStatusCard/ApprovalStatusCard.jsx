import "./ApprovalStatusCard.css";

function ApprovalStatusCard({ status = "Pending" }) {

    const options = ["Pending", "Approved", "Rejected"];

    return (

        <div className="approval-card">

            <h3>Approval Status</h3>

            <hr />

            <div className="approval-list">

                {options.map((item) => (

                    <div
                        key={item}
                        className="approval-item"
                    >

                        <span
                            className={`status-circle ${
                                status === item ? "active" : ""
                            }`}
                        ></span>

                        <span className="status-text">
                            {item}
                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ApprovalStatusCard;