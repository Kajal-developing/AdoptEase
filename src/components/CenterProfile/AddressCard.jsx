import "../../pages/center/CenterProfile.css";
import { useState, useEffect } from "react";
import { updateCenterProfile } from "../../api/authApi";

function AddressCard({ profile }) {

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({});

    const user = JSON.parse(localStorage.getItem("user"));

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

    return (

        <section className="profile-card">

            <div className="card-header">

                <h2>Address Information</h2>

                <button
                    className={isEditing ? "save-btn-outline" : "edit-btn"}
                    onClick={async () => {

                        if (isEditing) {

                            try {

                                await updateCenterProfile(
                                    user.userId,
                                    formData
                                );

                               // alert("Profile updated successfully.");

                                setIsEditing(false);

                            }

                            catch (error) {

                                alert("Failed to update profile.");

                            }

                        }
                        else {

                            setIsEditing(true);

                        }

                    }}
                >
                    {isEditing ? "Save Changes" : "Edit"}
                </button>

            </div>

            <div className="info-grid">

                <div className="info-item">

                    <label>Address</label>

                    <input
                        type="text"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                </div>

                <div className="info-item">

                    <label>City</label>

                    <input
                        type="text"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                </div>

                <div className="info-item">

                    <label>Latitude</label>

                    <input
                        type="text"
                        name="latitude"
                        value={formData.latitude || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                </div>

                <div className="info-item">

                    <label>Longitude</label>

                    <input
                        type="text"
                        name="longitude"
                        value={formData.longitude || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />

                </div>



            </div>

        </section>

    );

}

export default AddressCard;