import "./DeleteChildModal.css";

function DeleteChildModal({

    isOpen,

    onClose,

    onDelete

}) {

    if (!isOpen) return null;

    return (

        <div className="delete-modal-overlay">

            <div className="delete-modal">

                <h2>

                    Are you sure?

                </h2>

                <p>

                    Removing child profile will cancel all pending meetings
                    and hide the child details from parents permanently.

                </p>

                <div className="delete-modal-buttons">

                    <button

                        className="cancel-delete-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="confirm-delete-btn"

                        onClick={onDelete}

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteChildModal;