import "./Contact.css";

import { useLocation } from "react-router-dom";

import ParentWideLayout from "../../layouts/ParentWideLayout";
import CenterLayout from "../../layouts/CenterLayout";
import AdminLayout from "../../layouts/AdminLayout";

import { ContactInfo } from "../../components/Contact";

function Contact() {

    const location = useLocation();

    const Layout = location.pathname.startsWith("/admin")
        ? AdminLayout
        : location.pathname.startsWith("/center")
            ? CenterLayout
            : ParentWideLayout;

    return (

        <Layout>

            <div className="contact-page">

                <section className="contact-hero">

                    <div className="contact-hero-overlay">

                        <h1>

                            Contact Us

                        </h1>

                        <p>

                            We'd love to hear from you. Reach out for
                            assistance, questions, or support regarding
                            AdoptEase.

                        </p>

                    </div>

                </section>

                <ContactInfo />

                
            </div>

        </Layout>

    );

}

export default Contact;