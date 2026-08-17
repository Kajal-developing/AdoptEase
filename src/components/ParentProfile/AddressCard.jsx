import { useState } from "react";
import "./ParentProfile.css";

function AddressCard({
    profile,
    setProfile,
    onSave
}) {

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSave = async () => {

        const success = await onSave();

        if (success) {
            setIsEditing(false);
        }

    };

    return (

        <section className="profile-card">

            <div className="card-header">

                <h2 className="card-title">
                    Address Information
                </h2>

                <button
                    className={
                        isEditing
                            ? "profile-save-button"
                            : "profile-edit-button"
                    }
                    onClick={
                        isEditing
                            ? handleSave
                            : () => setIsEditing(true)
                    }
                >
                    {isEditing
                        ? "Save Changes"
                        : "Edit"}
                </button>

            </div>

            <div className="profile-grid">

                <div className="profile-field profile-field-full">

                    <label>
                        Residential Address
                    </label>

                    <textarea
                        rows="4"
                        name="address"
                        value={profile.address || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />

                </div>

                <div className="profile-field">

                    <label>City</label>

                    <input
                        type="text"
                        name="city"
                        value={profile.city || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />

                </div>

                <div className="profile-field">

                    <label>State</label>

                    <input
                        type="text"
                        value="Maharashtra"
                        readOnly
                    />

                </div>

                <div className="profile-field">

                    <label>Pincode</label>

                    <input
                        type="text"
                        value="411038"
                        readOnly
                    />

                </div>

                <div className="profile-field">

                    <label>Country</label>

                    <input
                        type="text"
                        value="India"
                        readOnly
                    />

                </div>

            </div>

        </section>

    );
}

export default AddressCard;