import "./../../pages/admin/AdminAbout.css";

import {
    Code2,
    Database,
    ShieldCheck,
    Bell,
    Bot,
    Server
} from "lucide-react";

function TechStack() {

    const technologies = [

        {
            icon: <Code2 size={36} />,
            name: "React",
            description: "Responsive frontend for an interactive user experience."
        },

        {
            icon: <Server size={36} />,
            name: "Spring Boot",
            description: "RESTful backend APIs and business logic."
        },

        {
            icon: <Database size={36} />,
            name: "MySQL",
            description: "Secure relational database for application data."
        },

        {
            icon: <Bell size={36} />,
            name: ".NET Logger",
            description: "Separate logging service for application monitoring."
        },

        {
            icon: <ShieldCheck size={36} />,
            name: "JWT Authentication",
            description: "Secure user authentication and authorization."
        },

        {
            icon: <Bot size={36} />,
            name: "AI Assistant",
            description: "Provides intelligent guidance and user support."
        }

    ];

    return (

        <section className="tech-stack-section">

            <div className="section-title">

                <h2>

                    Technology Stack

                </h2>

                <p>

                    AdoptEase is built using modern technologies that ensure
                    security, scalability and an excellent user experience.

                </p>

            </div>

            <div className="tech-grid">

                {

                    technologies.map((tech, index) => (

                        <div
                            key={index}
                            className="tech-card"
                        >

                            <div className="tech-icon">

                                {tech.icon}

                            </div>

                            <h3>

                                {tech.name}

                            </h3>

                            <p>

                                {tech.description}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default TechStack;