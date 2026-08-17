import "./../../pages/admin/AdminAbout.css";

import {
    Users,
    Building2,
    Baby,
    CalendarCheck,
    Bell,
    ShieldCheck
} from "lucide-react";

function Features() {

    const features = [

        {
            icon: <Users size={40} />,
            title: "Parent Management",
            description:
                "Manage parent registrations, profile verification and adoption requests."
        },

        {
            icon: <Building2 size={40} />,
            title: "Center Management",
            description:
                "Approve adoption centers and manage their complete information."
        },

        {
            icon: <Baby size={40} />,
            title: "Child Management",
            description:
                "Maintain child profiles, medical information and adoption availability."
        },

        {
            icon: <CalendarCheck size={40} />,
            title: "Meeting Management",
            description:
                "Monitor meetings between parents and adoption centers."
        },

        {
            icon: <Bell size={40} />,
            title: "Notifications",
            description:
                "Send updates and important notifications to parents and centers."
        },

        {
            icon: <ShieldCheck size={40} />,
            title: "Secure Administration",
            description:
                "Protect the platform with secure authentication and role-based access."
        }

    ];

    return (

        <section className="features-section">

            <div className="section-title">

                <h2>

                    Platform Features

                </h2>

                <p>

                    Powerful tools that help administrators efficiently manage
                    the complete adoption process.

                </p>

            </div>

            <div className="features-grid">

                {

                    features.map((feature, index) => (

                        <div
                            key={index}
                            className="feature-card"
                        >

                            <div className="feature-icon">

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

export default Features;