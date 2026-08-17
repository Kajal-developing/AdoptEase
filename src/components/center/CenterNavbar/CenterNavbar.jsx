import "./CenterNavbar.css";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { Search } from "lucide-react";
import logo from "../../../assets/logo/logo.svg";

function CenterNavbar() {
    const navigate = useNavigate();

    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    const [approvalStatus, setApprovalStatus] = useState("");

    const isApproved = approvalStatus === "APPROVED";

    useEffect(() => {

        setApprovalStatus(
            localStorage.getItem(
                `approvalStatus_${user.userId}`
            )
        );

        console.log(
            "Navbar Notice:",
            localStorage.getItem(
                `centerNoticeAccepted_${user.userId}`
            )
        );

    }, [user.userId]);

    const handleProtectedNavigation = (path) => {

        const noticeAccepted =
            localStorage.getItem(
                `centerNoticeAccepted_${user.userId}`
            ) === "true";

        if (!noticeAccepted) {

            alert(
                "Please read and accept the CARA declaration from the Home page before proceeding."
            );

            return;

        }

        navigate(path);

    };

    const handleSearch = () => {

        if (!searchTerm.trim()) {
            return;
        }

        navigate(
            `/center/all-children?search=${encodeURIComponent(searchTerm.trim())}`
        );

        setSearchTerm("");
    };

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
                    to="/center/about"
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

                        if (isApproved) {

                            handleProtectedNavigation("/center/all-children");

                        }

                    }}
                    className={() =>
                        location.pathname === "/center/all-children" ||
                            location.pathname.startsWith("/center/add-child") ||
                            location.pathname.startsWith("/center/edit-child")
                            ? "nav-link active"
                            : "nav-link"
                    }
                    style={{
                        pointerEvents:
                            !isApproved
                                ? "none"
                                : "auto",
                        opacity:
                            !isApproved
                                ? 0.5
                                : 1,
                        cursor:
                            !isApproved
                                ? "not-allowed"
                                : "pointer"
                    }}
                >
                    All Children
                </NavLink>

                <NavLink
                    to="#"
                    onClick={(e) => {

                        e.preventDefault();

                        if (isApproved) {

                            handleProtectedNavigation("/center/meeting-requests");

                        }

                    }}
                    className={() =>
                        location.pathname === "/center/meeting-requests"
                            ? "nav-link active"
                            : "nav-link"
                    }
                    style={{
                        pointerEvents:
                            !isApproved
                                ? "none"
                                : "auto",
                        opacity:
                            !isApproved
                                ? 0.5
                                : 1,
                        cursor:
                            !isApproved
                                ? "not-allowed"
                                : "pointer"
                    }}
                >
                    Request Meetings
                </NavLink>

                <NavLink
                    to="/center/contact"
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
                        placeholder="Search child..."
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
                    onClick={() => navigate("/center/profile")}
                >

                    <FiUser />

                </button>

            </div>

        </header>
    );
}

export default CenterNavbar;