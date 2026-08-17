import { useState } from "react";
import "./ParentProfile.css";

function PersonalInfoCard({
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
                    Personal Information
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

                <div className="profile-field">

                    <label>Full Name</label>

                    <input
                        type="text"
                        name="userName"
                        value={profile.userName || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />

                </div>

                <div className="profile-field">

                    <label>Email Address</label>

                    <input
                        type="email"
                        value={profile.email || ""}
                        readOnly
                    />

                </div>

                <div className="profile-field">

                    <label>Phone Number</label>

                    <input
                        type="text"
                        name="contactNo"
                        value={profile.contactNo || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />

                </div>

                <div className="profile-field">

                    <label>Age</label>

                    <input
                        type="number"
                        name="age"
                        value={profile.age || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />

                </div>

                <div className="profile-field">

                    <label>Gender</label>

                    <select
                        name="gender"
                        value={profile.gender || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    >

                        <option value="MALE">
                            Male
                        </option>

                        <option value="FEMALE">
                            Female
                        </option>

                    </select>

                </div>

                <div className="profile-field">

                    <label>Marital Status</label>

                    <select
                        name="maritalStatus"
                        value={profile.maritalStatus || ""}
                        onChange={handleChange}
                        disabled={!isEditing}
                    >

                        <option value="SINGLE">
                            Single
                        </option>

                        <option value="MARRIED">
                            Married
                        </option>

                    </select>

                </div>

                <div className="profile-field">

                    <label>Occupation</label>

                    <input
                        type="text"
                        name="occupation"
                        value={profile.occupation || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />

                </div>

                <div className="profile-field">

                    <label>Annual Income</label>

                    <input
                        type="number"
                        name="annualIncome"
                        value={profile.annualIncome || ""}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />

                </div>

            </div>

        </section>

    );
}

export default PersonalInfoCard;