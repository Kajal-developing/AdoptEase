import "../../pages/common/About.css";
import { FaShieldAlt, FaBuilding, FaHandshake } from "react-icons/fa";

function MissionSection() {

    return (

        <section className="mission-section">

            <div className="section-title">

                <h2>Our Mission</h2>

                <p>

                    We are committed to making the adoption process safe,
                    transparent, and accessible for every deserving child
                    and loving family.

                </p>

            </div>

            <div className="mission-grid">

                <div className="mission-card">

                    <div className="mission-icon">

                        <FaShieldAlt />

                    </div>

                    <h3>Safe & Secure</h3>

                    <p>

                        Protecting every family's information through a secure
                        and trusted adoption platform.

                    </p>

                </div>

                <div className="mission-card">

                    <div className="mission-icon">

                        <FaBuilding />

                    </div>

                    <h3>Verified Centers</h3>

                    <p>

                        We connect parents only with verified and authorized
                        adoption centers.

                    </p>

                </div>

                <div className="mission-card">

                    <div className="mission-icon">

                        <FaHandshake />

                    </div>

                    <h3>Transparent Process</h3>

                    <p>

                        Every step of the adoption journey is clear, legal,
                        and easy to follow.

                    </p>

                </div>

            </div>

        </section>

    );

}

export default MissionSection;