import "./../../pages/common/Contact.css";

import {
    Mail,
    Phone,
    MapPin,
    Clock
} from "lucide-react";

function ContactInfo() {

    return (

        <section className="contact-info-section">

            <div className="contact-card">

                <Mail
                    size={38}
                    className="contact-icon"
                />

                <h3>

                    Email

                </h3>

                <p>

                    support@adoptease.com

                </p>

            </div>

            <div className="contact-card">

                <Phone
                    size={38}
                    className="contact-icon"
                />

                <h3>

                    Phone

                </h3>

                <p>

                    +91 98765 43210

                </p>

            </div>

            <div className="contact-card">

                <MapPin
                    size={38}
                    className="contact-icon"
                />

                <h3>

                    Address

                </h3>

                <p>

                    Pune, Maharashtra, India

                </p>

            </div>

            <div className="contact-card">

                <Clock
                    size={38}
                    className="contact-icon"
                />

                <h3>

                    Working Hours

                </h3>

                <p>

                    Monday - Saturday

                    <br />

                    8:00 AM - 5:00 PM

                </p>

            </div>

        </section>

    );

}

export default ContactInfo;