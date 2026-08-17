import "./ParentNavbar.css";
import { FiUser } from "react-icons/fi";
import { Search } from "lucide-react";
import logo from "../../../assets/logo/logo.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function ParentNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const parentProfile = JSON.parse(localStorage.getItem("parentProfile"));

    const user = JSON.parse(localStorage.getItem("user"));

    const acceptedNotice =
        localStorage.getItem(`acceptedNotice_${user.userId}`) === "true";
    console.log("Approval Status:", parentProfile?.approvalStatus);
    console.log("Accepted Notice:", acceptedNotice);

    const isCitiesSection =
        location.pathname === "/cities" ||
        location.pathname.startsWith("/adoption-centers");

    const handleProtectedNavigation = (path) => {

        if (!acceptedNotice) {

            alert("Please accept the CARA declaration first.");

            return;

        }

        navigate(path);

    };

    const handleSearch = () => {

        if (!searchTerm.trim()) {
            return;
        }

        navigate(
            `/cities?search=${encodeURIComponent(searchTerm.trim())}`
        );

        setSearchTerm("");
    };

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
                    to="#"
                    onClick={(e) => {

                        e.preventDefault();

                        if (parentProfile?.approvalStatus === "APPROVED") {

                            handleProtectedNavigation("/cities");

                        }

                    }}
                    className={() =>
                        location.pathname === "/cities" ||
                            location.pathname.startsWith("/adoption-centers") ||
                            location.pathname.startsWith("/children") ||
                            location.pathname.startsWith("/book-meeting")
                            ? "nav-link active"
                            : "nav-link"
                    }
                    style={{
                        pointerEvents:
                            parentProfile?.approvalStatus !== "APPROVED"
                                ? "none"
                                : "auto",
                        opacity:
                            parentProfile?.approvalStatus !== "APPROVED"
                                ? 0.5
                                : 1,
                        cursor:
                            parentProfile?.approvalStatus !== "APPROVED"
                                ? "not-allowed"
                                : "pointer"
                    }}
                >
                    Cities
                </NavLink>

                <NavLink
                    to="#"
                    onClick={(e) => {

                        e.preventDefault();

                        if (parentProfile?.approvalStatus === "APPROVED") {

                            handleProtectedNavigation("/scheduled-meetings");

                        }

                    }}
                    className={() =>
                        location.pathname === "/scheduled-meetings"
                            ? "nav-link active"
                            : "nav-link"
                    }
                    style={{
                        pointerEvents:
                            parentProfile?.approvalStatus !== "APPROVED"
                                ? "none"
                                : "auto",
                        opacity:
                            parentProfile?.approvalStatus !== "APPROVED"
                                ? 0.5
                                : 1,
                        cursor:
                            parentProfile?.approvalStatus !== "APPROVED"
                                ? "not-allowed"
                                : "pointer"
                    }}
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
                        placeholder="Search city..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />

                    <button
                        className="search-btn"
                        onClick={handleSearch}
                    >
                        <Search
                            size={22}
                            strokeWidth={2.2}
                        />
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