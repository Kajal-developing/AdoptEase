import { useRef, useState, useEffect } from "react";
import "./ParentProfile.css";
import { FiCamera } from "react-icons/fi";
import LogoutButton from "../../components/common/LogoutButton";

import {
    updateParentProfilePhoto,
    getParentProfile
} from "../../api/authApi";

function ParentProfileHeader({ profile }) {

    const [profileImage, setProfileImage] = useState(
        "https://placehold.co/150x150?text=Photo"
    );

    const fileInputRef = useRef(null);

    // Load saved profile photo from backend
    useEffect(() => {

        if (profile?.profilePhoto) {

            setProfileImage(
                `http://localhost:8080/images/parents/${profile.profilePhoto}`
            );

        } else {

            setProfileImage(
                "https://placehold.co/150x150?text=Photo"
            );

        }

    }, [profile?.profilePhoto]);


    const handleChangePhoto = () => {

        fileInputRef.current.click();

    };


    const handleFileChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            // Upload to backend
            await updateParentProfilePhoto(
                profile.userId,
                file
            );

            // Get latest profile from backend
            const response =
                await getParentProfile(profile.userId);

            // Set saved image returned by backend
            if (response.data.profilePhoto) {

                setProfileImage(
                    `http://localhost:8080/images/parents/${response.data.profilePhoto}`
                );

            }

        }
        catch (error) {

            console.error(
                "Profile photo update failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to update profile photo."
            );

        }

        // Allow selecting the same file again
        e.target.value = "";

    };


    return (

        <section className="profile-header-card">

            <div className="profile-avatar">

                <img
                    src={profileImage}
                    alt="Profile"
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://placehold.co/150x150?text=Photo";
                    }}
                />

                <button
                    type="button"
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

                <h1>
                    Parent Profile
                </h1>

                <h2>
                    {profile.userName}
                </h2>

                <span className="verified-badge">

                    ✔ Verified Parent

                </span>

                <div className="profile-meta">

                    <div>

                        <strong>
                            Parent ID
                        </strong>

                        <p>
                            PAR{profile.userId}
                        </p>

                    </div>

                    <div>

                        <strong>
                            Member Since
                        </strong>

                        <p>
                            July 2026
                        </p>

                    </div>

                </div>

            </div>


            <div className="profile-logout">

                <LogoutButton />

            </div>

        </section>

    );

}

export default ParentProfileHeader;