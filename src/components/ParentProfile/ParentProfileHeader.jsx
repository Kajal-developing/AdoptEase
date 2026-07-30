import { useRef, useState } from "react";
import "./ParentProfile.css";
import { FiCamera } from "react-icons/fi";

function ParentProfileHeader() {

    const [profileImage, setProfileImage] = useState(
        "https://placehold.co/150x150"
    );

    const fileInputRef = useRef(null);

    const handleChangePhoto = () => {

        fileInputRef.current.click();

    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setProfileImage(URL.createObjectURL(file));

    };

    return (

        <section className="profile-header-card">

            <div className="profile-avatar">

                <img
                    src={profileImage}
                    alt="Profile"
                />

                <button
                    className="change-photo-btn"
                    onClick={handleChangePhoto}
                >

                    <FiCamera />

                    Change Photo

                </button>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />

            </div>

            <div className="profile-details">

                <h1>Parent Profile</h1>

                <h2>Kajal Nimbekar</h2>

                <span className="verified-badge">

                    ✔ Verified Parent

                </span>

                <div className="profile-meta">

                    <div>

                        <strong>Parent ID</strong>

                        <p>PAR00001</p>

                    </div>

                    <div>

                        <strong>Member Since</strong>

                        <p>July 2026</p>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default ParentProfileHeader;