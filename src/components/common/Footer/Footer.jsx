import "./Footer.css";
import { Link } from "react-router-dom";
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

                    <Link to="/">Home</Link>

                    <Link to="/about">About Us</Link>

                    <Link to="/process">Adoption Process</Link>

                    <Link to="/privacy-policy">
                        Privacy Policy
                    </Link>

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