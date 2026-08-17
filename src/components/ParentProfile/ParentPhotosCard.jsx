import { useRef } from "react";
import { FiCamera } from "react-icons/fi";

import "./ParentProfile.css";

function ParentPhotosCard({
    profile,
    onHousePhotoChange,
    onFamilyPhotoChange
}) {

    const houseInputRef = useRef(null);
    const familyInputRef = useRef(null);

    const housePhotoUrl = profile.housePhoto
        ? `http://localhost:8080/images/parents/${profile.housePhoto}`
        : "https://placehold.co/300x200?text=House+Photo";

    const familyPhotoUrl = profile.familyPhoto
        ? `http://localhost:8080/images/parents/${profile.familyPhoto}`
        : "https://placehold.co/300x200?text=Family+Photo";


    const handleHouseClick = () => {
        houseInputRef.current.click();
    };


    const handleFamilyClick = () => {
        familyInputRef.current.click();
    };


    return (

        <section className="profile-card parent-photos-card">

            <h2 className="card-title">
                Family & Residence Photos
            </h2>

            <div className="parent-photos-grid">

                {/* HOUSE PHOTO */}

                <div className="parent-photo-item">

                    <h3>
                        House Photo
                    </h3>

                    <img
                        src={housePhotoUrl}
                        alt="House"
                        className="parent-profile-photo"
                    />

                    <button
                        className="photo-change-button"
                        onClick={handleHouseClick}
                    >
                        <FiCamera />
                        Change Photo
                    </button>

                    <input
                        type="file"
                        accept="image/*"
                        ref={houseInputRef}
                        style={{ display: "none" }}
                        onChange={(e) => {

                            const file =
                                e.target.files[0];

                            if (file) {
                                onHousePhotoChange(file);
                            }

                        }}
                    />

                </div>


                {/* FAMILY PHOTO */}

                <div className="parent-photo-item">

                    <h3>
                        Family Photo
                    </h3>

                    <img
                        src={familyPhotoUrl}
                        alt="Family"
                        className="parent-profile-photo"
                    />

                    <button
                        className="photo-change-button"
                        onClick={handleFamilyClick}
                    >
                        <FiCamera />
                        Change Photo
                    </button>

                    <input
                        type="file"
                        accept="image/*"
                        ref={familyInputRef}
                        style={{ display: "none" }}
                        onChange={(e) => {

                            const file =
                                e.target.files[0];

                            if (file) {
                                onFamilyPhotoChange(file);
                            }

                        }}
                    />

                </div>

            </div>

        </section>
    );
}

export default ParentPhotosCard;