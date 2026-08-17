import "../../pages/common/About.css";
import {
    FaUserShield,
    FaMapMarkedAlt,
    FaCalendarAlt,
    FaHandsHelping
} from "react-icons/fa";

function WhyChooseSection() {

    const features = [

        {
            icon: <FaUserShield />,
            title: "Trusted & Secure",
            description:
                "Your personal information is protected with a secure and reliable platform."
        },

        {
            icon: <FaMapMarkedAlt />,
            title: "Verified Centers",
            description:
                "Browse children from verified adoption centers across different cities."
        },

        {
            icon: <FaCalendarAlt />,
            title: "Easy Scheduling",
            description:
                "Book and manage meetings with adoption centers in just a few clicks."
        },

        {
            icon: <FaHandsHelping />,
            title: "Transparent Process",
            description:
                "Track every step of your adoption journey with complete transparency."
        }

    ];

    return (

        <section className="why-section">

            <div className="section-title">

                <h2>Why Choose AdoptEase?</h2>

                <p>

                    We simplify the adoption process while ensuring trust,
                    transparency, and convenience for every family.

                </p>

            </div>

            <div className="why-grid">

                {

                    features.map((feature, index) => (

                        <div
                            className="why-card"
                            key={index}
                        >

                            <div className="why-icon">

                                {feature.icon}

                            </div>

                            <h3>

                                {feature.title}

                            </h3>

                            <p>

                                {feature.description}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default WhyChooseSection;