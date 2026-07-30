import "./NextStepCard.css";

function NextStepCard() {

    return (

        <div className="next-step-card">

            <h3>What's Next</h3>

            <hr />

            <div className="step-item">
                <strong>PENDING</strong> → "Your profile is under review. We'll notify you once approved."
            </div>

            <div className="step-item">
                <strong>APPROVED</strong> → "You're all set! Start browsing adoption centers near you."
            </div>

            <div className="step-item">
                <strong>REJECTED</strong> → "Please review your profile details and resubmit."
            </div>

        </div>

    );

}

export default NextStepCard;