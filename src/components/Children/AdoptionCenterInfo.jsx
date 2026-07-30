import "./Children.css";

import {
    MapPin,
    Phone,
    Mail,
    BadgeCheck
} from "lucide-react";

function AdoptionCenterInfo({ centerId }) {

    console.log("Selected Center :", centerId);

    return (

        <section className="center-info-section">

            <div className="center-info-card">

                <div className="center-info-header">

                    <div>

                        <h2>
                            Sarvesham Seva Sangh
                        </h2>

                        <p className="center-city">

                            Pune, Maharashtra

                        </p>

                    </div>

                    <span className="center-status">

                        Active

                    </span>

                </div>

                <div className="center-info-grid">

                    <div className="info-item">

                        <MapPin size={20} />

                        <span>

                            43, Sinhgad College Road, Pune,
                            Maharashtra 411041

                        </span>

                    </div>

                    <div className="info-item">

                        <Phone size={20} />

                        <span>

                            +91 9876543210

                        </span>

                    </div>

                    <div className="info-item">

                        <Mail size={20} />

                        <span>

                            contact@sarvesham.org

                        </span>

                    </div>

                    <div className="info-item">

                        <BadgeCheck size={20} />

                        <span>

                            License No :
                            SAA/MH/PUNE/2026/001

                        </span>

                    </div>

                </div>

                <p className="center-description">

                    Sarvesham Seva Sangh is a Government
                    registered adoption center dedicated to
                    providing a safe, loving and nurturing
                    environment for children awaiting adoption.
                    The center focuses on healthcare, education,
                    emotional well-being and ensuring every child
                    receives equal opportunities before finding a
                    permanent family.

                </p>

            </div>

        </section>

    );

}

export default AdoptionCenterInfo;