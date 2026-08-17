import "../../pages/center/CenterProfile.css";

import { useState, useEffect } from "react";

import { updateCenterProfile } from "../../api/authApi";

import SuccessModal from "../common/SuccessModal";


function CenterInfoCard({ profile }) {

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({});

    const [showSuccessModal, setShowSuccessModal] =
        useState(false);

    const user =
        JSON.parse(localStorage.getItem("user"));


    useEffect(() => {

        if (profile) {

            setFormData(profile);

        }

    }, [profile]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    const handleSave = async () => {

        try {

            await updateCenterProfile(
                user.userId,
                formData
            );

            // Exit edit mode
            setIsEditing(false);

            // Show success popup
            setShowSuccessModal(true);

        }

        catch (error) {

            alert("Failed to update profile.");

        }

    };


    const handleButtonClick = () => {

        if (isEditing) {

            handleSave();

        }
        else {

            setIsEditing(true);

        }

    };


    return (

        <>

            <section className="profile-card">

                <div className="card-header">

                    <h2>
                        Center Information
                    </h2>

                    <button
                        className={
                            isEditing
                                ? "save-btn-outline"
                                : "edit-btn"
                        }

                        onClick={handleButtonClick}
                    >

                        {isEditing
                            ? "Save Changes"
                            : "Edit"}

                    </button>

                </div>


                <div className="info-grid">

                    <div className="info-item">

                        <label>
                            Center Name
                        </label>

                        <input
                            type="text"
                            name="centerName"
                            value={
                                formData.centerName || ""
                            }
                            onChange={handleChange}
                            disabled={!isEditing}
                        />

                    </div>


                    <div className="info-item">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={
                                formData.email || ""
                            }
                            onChange={handleChange}
                            disabled={!isEditing}
                        />

                    </div>


                    <div className="info-item">

                        <label>
                            Phone
                        </label>

                        <input
                            type="text"
                            name="contactNo"
                            value={
                                formData.contactNo || ""
                            }
                            onChange={handleChange}
                            disabled={!isEditing}
                        />

                    </div>


                    <div className="info-item">

                        <label>
                            License Number
                        </label>

                        <input
                            type="text"
                            name="licenseNumber"
                            value={
                                formData.licenseNumber || ""
                            }
                            onChange={handleChange}
                            disabled={!isEditing}
                        />

                    </div>


                    <div className="info-item full-width">

                        <label>
                            Description
                        </label>

                        <textarea
                            rows="5"
                            name="description"
                            value={
                                formData.description || ""
                            }
                            onChange={handleChange}
                            disabled={!isEditing}
                        />

                    </div>

                </div>

            </section>


            {/* Success Popup */}

            <SuccessModal
                isOpen={showSuccessModal}

                title="Profile Updated"

                message="Your center profile has been updated successfully."

                onClose={() =>
                    setShowSuccessModal(false)
                }
            />

        </>

    );
}


export default CenterInfoCard;