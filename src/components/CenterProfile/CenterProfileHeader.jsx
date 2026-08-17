import { useRef, useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";

import "../../pages/center/CenterProfile.css";

import LogoutButton from "../../components/common/LogoutButton";

import {
    updateCenterPhoto,
    getCenterProfile
} from "../../api/authApi";


function CenterProfileHeader({ profile }) {

    const [logo, setLogo] = useState(
        "https://placehold.co/170x170?text=Logo"
    );

    const fileInputRef = useRef(null);


    // Load saved center photo from backend
    useEffect(() => {

        if (profile?.centerPhoto) {

            setLogo(
                `http://localhost:8080/images/centers/${profile.centerPhoto}`
            );

        } else {

            setLogo(
                "https://placehold.co/170x170?text=Logo"
            );

        }

    }, [profile?.centerPhoto]);


    const handleLogoClick = () => {

        fileInputRef.current.click();

    };


    const handleLogoChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            // Upload image to backend
            await updateCenterPhoto(
                profile.userId,
                file
            );


            // Get latest profile from backend
            const response =
                await getCenterProfile(
                    profile.userId
                );


            // Display saved image
            if (response.data.centerPhoto) {

                setLogo(
                    `http://localhost:8080/images/centers/${response.data.centerPhoto}`
                );

            }

        }
        catch (error) {

            console.error(
                "Center photo update failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to update center photo."
            );

        }

        // Allow selecting same file again
        e.target.value = "";

    };


    const memberSince = profile.createdAt
        ? new Date(
            profile.createdAt
        ).toLocaleDateString(
            "en-IN",
            {
                month: "long",
                year: "numeric",
            }
        )
        : "";


    return (

        <section className="center-header-card">

            <div className="center-logo-section">

                <img
                    src={logo}
                    alt="Center Logo"
                    className="center-logo"
                    onError={(e) => {

                        e.currentTarget.src =
                            "https://placehold.co/170x170?text=Logo";

                    }}
                />

                <button
                    type="button"
                    className="change-logo-btn"
                    onClick={handleLogoClick}
                >

                    <FiCamera />

                    Change Logo

                </button>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleLogoChange}
                />

            </div>


            <div className="center-header-details">

                <h1>
                    Center Profile
                </h1>

                <h2>
                    {profile.centerName}
                </h2>


                {profile.approvalStatus === "APPROVED" && (

                    <span className="verified-center">

                        ✔ Verified Adoption Center

                    </span>

                )}


                <div className="center-meta">

                    <div>

                        <strong>
                            Center ID
                        </strong>

                        <p>
                            {profile.centerId}
                        </p>

                    </div>


                    <div>

                        <strong>
                            License No.
                        </strong>

                        <p>
                            {profile.licenseNumber}
                        </p>

                    </div>


                    <div>

                        <strong>
                            Member Since
                        </strong>

                        <p>
                            {memberSince}
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

export default CenterProfileHeader;