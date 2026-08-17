import "./Children.css";

import {
    MapPin,
    Phone,
    Mail,
    BadgeCheck
} from "lucide-react";

function AdoptionCenterInfo({ center }) {

    if (!center) return null;

    return (

        <section className="center-info-section">

            <div className="center-info-card">

                <div className="center-info-header">

                    <div>

                        <h2>

                            {center.centerName}

                        </h2>

                        <p className="center-city">

                            {center.city}

                        </p>

                    </div>

                    <span className="center-status">

                        {center.isActive ? "Active" : "Inactive"}

                    </span>

                </div>

                <div className="center-info-grid">

                    <div className="info-item">

                        <MapPin size={20} />

                        <span>

                            {center.address}

                        </span>

                    </div>

                    <div className="info-item">

                        <Phone size={20} />

                        <span>

                            +91 {center.contactNo}
                        </span>

                    </div>

                    <div className="info-item">

                        <Mail size={20} />

                        <span>

                            {center.email}

                        </span>

                    </div>

                    <div className="info-item">

                        <BadgeCheck size={20} />

                        <span>

                            License No : {center.licenseNumber}

                        </span>

                    </div>

                </div>

                <p className="center-description">

                    {center.description}

                </p>

            </div>

        </section>

    );

}

export default AdoptionCenterInfo;