import "./ParentNavbar.css";
import { FiUser } from "react-icons/fi";
import { Search } from "lucide-react";
import logo from "../../../assets/logo/logo.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

function ParentNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isCitiesSection =
        location.pathname === "/cities" ||
        location.pathname.startsWith("/adoption-centers");

    return (
        <header className="parent-navbar">

            {/* Logo */}

            <Link to="/parent/home" className="navbar-logo">
                <img src={logo} alt="AdoptEase" />
            </Link>

            {/* Navigation */}

            <nav className="navbar-menu">

                <NavLink
                    to="/parent/home"
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
                    to="/cities"
                    className={() =>
                        location.pathname === "/cities" ||
                            location.pathname.startsWith("/adoption-centers") ||
                            location.pathname.startsWith("/children") ||
                            location.pathname.startsWith("/book-meeting")
                            ? "nav-link active"
                            : "nav-link"
                    }
                >
                    Cities
                </NavLink>

                <NavLink
                    to="/scheduled-meetings"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Scheduled Meetings
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
                    onClick={() => navigate("/parent-profile")}
                >
                    <FiUser />
                </button>

            </div>

        </header >
    );
}

export default ParentNavbar;