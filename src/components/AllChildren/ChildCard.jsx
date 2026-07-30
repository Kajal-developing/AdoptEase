import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteChildModal from "./DeleteChildModal";

import "../../pages/center/AllChildren.css";

function ChildCard({ child }) {

    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {

        // Backend delete API here

        alert(`${child.name} deleted successfully.`);

        setShowDeleteModal(false);

    };

    return (

        <>

            <div className="child-card">

                <img

                    src={child.image}

                    alt={child.name}

                    className="child-image"

                />

                <div className="child-content">

                    <div className="child-header">

                        <h3 className="child-name">

                            {child.name}

                        </h3>

                        <span className="child-status">

                            <span className={`status-dot ${child.status.toLowerCase()}`}></span>

                            <span className="status-text">

                                {child.status}

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

                        Health : <strong>{child.health}</strong>

                    </p>

                    <p className="child-description">

                        {child.description}

                    </p>

                    <div className="child-buttons">

                        <button

                            className="edit-btn"

                            onClick={() => navigate(`/center/edit-child/${child.id}`)}

                        >

                            Edit

                        </button>

                        <button

                            className="delete-btn"

                            onClick={() => setShowDeleteModal(true)}

                        >

                            Delete

                        </button>

                    </div>

                </div>


            </div>

            <DeleteChildModal

                isOpen={showDeleteModal}

                onClose={() => setShowDeleteModal(false)}

                onDelete={handleDelete}

            />

        </>

    );

}

export default ChildCard;