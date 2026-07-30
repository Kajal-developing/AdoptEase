import { useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";

import "../../pages/center/CenterProfile.css";

function CenterProfileHeader() {

    const [logo, setLogo] = useState(
        "https://placehold.co/150x150?text=Logo"
    );

    const fileInputRef = useRef(null);

    const handleLogoClick = () => {

        fileInputRef.current.click();

    };

    const handleLogoChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setLogo(URL.createObjectURL(file));

    };

    return (

        <section className="center-header-card">

            <div className="center-logo-section">

                <img

                    src={logo}

                    alt="Center Logo"

                    className="center-logo"

                />

                <button

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

                    Helping Hands Adoption Center

                </h2>

                <span className="verified-center">

                    ✔ Verified Adoption Center

                </span>

                <div className="center-meta">

                    <div>

                        <strong>

                            Center ID

                        </strong>

                        <p>

                            CEN00001

                        </p>

                    </div>

                    <div>

                        <strong>

                            License No.

                        </strong>

                        <p>

                            CARA/MH/2026/4587

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

        </section>

    );

}

export default CenterProfileHeader;