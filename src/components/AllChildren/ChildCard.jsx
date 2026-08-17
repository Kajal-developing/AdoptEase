import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteChildModal from "./DeleteChildModal";

import { deactivateCenterChild } from "../../api/authApi";

import "../../pages/center/AllChildren.css";

function ChildCard({ child }) {

    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {

        try {

            setIsDeleting(true);

            await deactivateCenterChild(
                child.childId
            );

            alert(
                `${child.childName} deleted successfully.`
            );

            setShowDeleteModal(false);

            // Refresh All Children page
            window.location.reload();

        }
        catch (error) {

            console.log(
                "Delete Child Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to delete child."
            );

        }
        finally {

            setIsDeleting(false);

        }

    };

    return (

        <>

            <div className="child-card">

                <img
                    src={
                        child.childPhoto
                            ? `http://localhost:8080/images/children/${child.childPhoto}`
                            : "https://placehold.co/400x300?text=No+Photo"
                    }
                    alt={child.childName}
                    className="child-image"
                />

                <div className="child-content">

                    <div className="child-header">

                        <h3 className="child-name">

                            {child.childName}

                        </h3>

                        <span className="child-status">

                            <span
                                className={`status-dot ${child.availableStatus === "AVAILABLE"
                                        ? "available"
                                        : child.availableStatus === "MEETING_BOOKED"
                                            ? "reserved"
                                            : child.availableStatus === "ADOPTED"
                                                ? "adopted"
                                                : ""
                                    }`}
                            >
                            </span>

                            <span className="status-text">

                                {child.availableStatus === "AVAILABLE"
                                    ? "Available"
                                    : child.availableStatus === "MEETING_BOOKED"
                                        ? "Reserved"
                                        : child.availableStatus === "ADOPTED"
                                            ? "Adopted"
                                            : child.availableStatus}

                            </span>

                        </span>

                    </div>

                    <div className="child-meta">

                        <span>
                            Age : {child.age} yrs
                        </span>

                        <span>
                            {child.gender}
                        </span>

                    </div>

                    <p className="child-health">

                        Health : <strong>
                            {child.healthStatus}
                        </strong>

                    </p>

                    <p className="child-description">

                        {child.description}

                    </p>

                    <div className="child-buttons">

                        <button
                            className="child-edit-btn"
                            onClick={() => navigate(
                                `/center/edit-child/${child.childId}`)}
                        >

                            Edit

                        </button>

                        <button
                            className="child-delete-btn"
                            onClick={() =>
                                setShowDeleteModal(true)
                            }
                            disabled={isDeleting}
                        >

                            {isDeleting
                                ? "Deleting..."
                                : "Delete"
                            }

                        </button>

                    </div>

                </div>

            </div>

            <DeleteChildModal

                isOpen={showDeleteModal}

                onClose={() =>
                    setShowDeleteModal(false)
                }

                onDelete={handleDelete}

            />

        </>

    );

}

export default ChildCard;