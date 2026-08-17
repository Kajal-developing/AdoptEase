import "./AdminNavbar.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { Search } from "lucide-react";
import logo from "../../../assets/logo/logo.svg";
import { useState } from "react";

function AdminNavbar() {

    const location = useLocation();

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {

        if (!searchTerm.trim()) {
            return;
        }

        navigate(
            `/admin/parent-requests?search=${encodeURIComponent(searchTerm.trim())}`
        );

        setSearchTerm("");
    };

    return (

        <header className="admin-navbar">

            {/* Logo */}

            <Link
                to="/admin/home"
                className="navbar-logo"
            >
                <img
                    src={logo}
                    alt="AdoptEase"
                />
            </Link>

            {/* Navigation */}

            <nav className="navbar-menu">

                <NavLink
                    to="/admin/home"
                    className={() =>
                        (
                            location.pathname === "/admin/home" ||
                            location.pathname === "/admin/parent-requests" ||
                            location.pathname === "/admin/center-requests"
                        )
                            ? "nav-link active"
                            : "nav-link"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/admin/about"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    About
                </NavLink>

                <NavLink
                    to="/admin/contact"
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
                        placeholder="Search parent or center..."
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

                <Link
                    to="/admin/profile"
                    className="profile-button"
                >

                    <FiUser />

                </Link>

            </div>

        </header>

    );

}

export default AdminNavbar;