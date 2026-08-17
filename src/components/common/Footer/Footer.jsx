import "./Footer.css";
import { Link, useLocation } from "react-router-dom";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaPinterestP,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

import logo from "../../../assets/logo/logo.svg";

function Footer() {

    const location = useLocation();

    const isCenter = location.pathname.startsWith("/center");

    const isAdmin = location.pathname.startsWith("/admin");

    const homeLink = isAdmin
        ? "/admin/home"
        : isCenter
            ? "/center/home"
            : "/parent/home";

    const aboutLink = isAdmin
        ? "/admin/about"
        : isCenter
            ? "/center/about"
            : "/about";

    const privacyLink = isAdmin
        ? "/admin/privacy-policy"
        : isCenter
            ? "/center/privacy-policy"
            : "/parent/privacy-policy";

    const adoptionProcedureLink = isAdmin
        ? "/admin/adoption-procedure"
        : isCenter
            ? "/center/adoption-procedure"
            : "/adoption-procedure";

    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Logo */}

                <div className="footer-column">

                    <img
                        src={logo}
                        alt="AdoptEase"
                        className="footer-logo"
                    />

                    <p>
                        Connecting loving families with
                        children who deserve a caring home.
                    </p>

                </div>

                {/* Contact */}

                <div className="footer-column">

                    <h3>CONTACT</h3>

                    <p>All days 8 a.m – 5 p.m</p>

                    <p>
                        <FaPhoneAlt />
                        +91 9876543210
                    </p>

                    <p>
                        <FaEnvelope />
                        contact@adoptease.com
                    </p>

                </div>

                {/* Quick Links */}

                <div className="footer-column">

                    <h3>QUICK LINKS</h3>

                    <ul className="footer-links">

                        <li>
                            <Link to={homeLink}>Home</Link>
                        </li>

                        <li>
                            <Link to={aboutLink}>About Us</Link>
                        </li>

                        <Link to={adoptionProcedureLink}>
                            Adoption Process
                        </Link>

                        <li>
                            <Link to={privacyLink}>
                                Privacy Policy
                            </Link>
                        </li>

                    </ul>

                </div>

                {/* Social */}

                <div className="footer-column">

                    <h3>SOCIAL</h3>

                    <a href="#"><FaFacebookF /> Facebook</a>

                    <a href="#"><FaTwitter /> Twitter</a>

                    <a href="#"><FaInstagram /> Instagram</a>

                    <a href="#"><FaPinterestP /> Pinterest</a>

                    <a href="#"><FaYoutube /> YouTube</a>

                </div>

            </div>

            <div className="footer-bottom">

                ©2026 <span>AdoptEase</span>. All Rights Reserved.

            </div>

        </footer>
    );
}

export default Footer;