import "./../../pages/admin/AdminAbout.css";

import { Target, Eye } from "lucide-react";

function MissionVision() {

    return (

        <section className="mission-vision-section">

            <div className="mission-card">

                <Target
                    size={42}
                    className="mission-icon"
                />

                <h2>

                    Our Mission

                </h2>

                <p>

                    To simplify and digitalize the adoption process by
                    providing a secure, transparent and efficient platform
                    that connects administrators, adoption centers and
                    prospective parents while ensuring every child finds
                    a loving home.

                </p>

            </div>

            <div className="vision-card">

                <Eye
                    size={42}
                    className="vision-icon"
                />

                <h2>

                    Our Vision

                </h2>

                <p>

                    To become a trusted adoption management platform that
                    promotes ethical adoption practices, improves
                    collaboration among stakeholders and creates a better
                    future for every child.

                </p>

            </div>

        </section>

    );

}

export default MissionVision;