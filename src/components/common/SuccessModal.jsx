import "./SuccessModal.css";

function SuccessModal({
    isOpen,
    title = "Success",
    message = "Changes saved successfully.",
    onClose
}) {

    if (!isOpen) {
        return null;
    }

    return (

        <div className="success-modal-overlay">

            <div className="success-modal">

                <div className="success-modal-icon">
                    ✓
                </div>

                <h2>
                    {title}
                </h2>

                <p>
                    {message}
                </p>

                <button
                    className="success-modal-button"
                    onClick={onClose}
                >
                    OK
                </button>

            </div>

        </div>
    );
}

export default SuccessModal;