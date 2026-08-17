import "./../../pages/admin/ParentRequests.css";

function ActionButtons({
    decision,
    setDecision,
    disabled
}) {

    return (

        <div className="action-buttons">

            <button
                type="button"
                disabled={disabled}
                onClick={() =>
                    setDecision("accepted")
                }
                className={
                    decision === "accepted"
                        ? "accept-btn active-accept"
                        : "accept-btn"
                }
            >
                Accept
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={() =>
                    setDecision("rejected")
                }
                className={
                    decision === "rejected"
                        ? "reject-btn active-reject"
                        : "reject-btn"
                }
            >
                Reject
            </button>

        </div>

    );

}

export default ActionButtons;