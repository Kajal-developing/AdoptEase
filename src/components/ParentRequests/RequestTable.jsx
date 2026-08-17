import "./../../pages/admin/ParentRequests.css";

function RequestTable({ parent }) {

    return (
        <div className="request-table">

            <div className="request-table-header">

                <div>Status</div>

                <div>Occupation</div>

                <div>Annual Income</div>

                <div>Marital Status</div>

            </div>

            <div className="request-table-row">

                <div>
                    {parent.approvalStatus}
                </div>

                <div>
                    {parent.occupation}
                </div>

                <div>
                    ₹{parent.annualIncome}
                </div>

                <div>
                    {parent.maritalStatus}
                </div>

            </div>

        </div>
    );
}

export default RequestTable;