import "../../pages/common/About.css";
import {
    FaUserPlus,
    FaClipboardCheck,
    FaChild,
    FaCalendarCheck,
    FaHeart
} from "react-icons/fa";

function ProcessSection() {

    const steps = [

        {
            icon: <FaUserPlus />,
            number: "01",
            title: "Register",
            description:
                "Create your AdoptEase account and complete your parent profile."
        },

        {
            icon: <FaClipboardCheck />,
            number: "02",
            title: "Verification",
            description:
                "Upload the required documents and complete the verification process."
        },

        {
            icon: <FaChild />,
            number: "03",
            title: "Browse Children",
            description:
                "Explore children from verified adoption centers and choose the best match."
        },

        {
            icon: <FaCalendarCheck />,
            number: "04",
            title: "Book Meeting",
            description:
                "Schedule a meeting with the selected adoption center."
        },

        {
            icon: <FaHeart />,
            number: "05",
            title: "Complete Adoption",
            description:
                "Finish the legal adoption process and welcome a new family member."
        }

    ];

    return (

        <section className="process-section">

            <div className="section-title">

                <h2>How AdoptEase Works</h2>

                <p>

                    Follow these simple steps to begin your adoption journey.

                </p>

            </div>

            <div className="process-grid">

                {

                    steps.map((step) => (

                        <div
                            className="process-card"
                            key={step.number}
                        >

                            <div className="process-number">

                                {step.number}

                            </div>

                            <div className="process-icon">

                                {step.icon}

                            </div>

                            <h3>{step.title}</h3>

                            <p>{step.description}</p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default ProcessSection;