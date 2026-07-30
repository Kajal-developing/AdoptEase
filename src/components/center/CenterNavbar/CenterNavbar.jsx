import "./CenterNavbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { Search } from "lucide-react";
import logo from "../../../assets/logo/logo.svg";

function CenterNavbar() {
    const navigate = useNavigate();

    return (
        <header className="center-navbar">

            {/* Logo */}

            <Link to="/center/home" className="navbar-logo">
                <img src={logo} alt="AdoptEase" />
            </Link>

            {/* Navigation */}

            <nav className="navbar-menu">

                <NavLink
                    to="/center/home"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    About
                </NavLink>

                <NavLink
                    to="/center/all-children"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    All Children
                </NavLink>

                <NavLink
                    to="/center/meeting-requests"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Request Meetings
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Contact
                </NavLink>

            </nav>

            {/* Right Section */}

            <div className="navbar-right">

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search"
                    />

                    <button className="search-btn">
                        <Search size={22} strokeWidth={2.2} />
                    </button>

                </div>

                <button
                    className="profile-button"
                    onClick={() => navigate("/center/profile")}
                >

                    <FiUser />

                </button>

            </div>

        </header>
    );
}

export default CenterNavbar;