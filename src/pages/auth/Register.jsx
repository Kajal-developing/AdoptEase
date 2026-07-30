import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import InputField from "../../components/common/InputField";
import PasswordField from "../../components/common/PasswordField";
import PrimaryButton from "../../components/common/PrimaryButton";

import "./Register.css";

// Import Images
import loginImage from "../../assets/images/login image.jpg";
import logo from "../../assets/logo/logo.svg";

function Register() {
    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) setError("");
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!registerData.username.trim()) {
            setError("Username is required");
            return;
        }

        if (registerData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (registerData.password !== registerData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!isVerified) {
            setError("Please verify you're not a robot");
            return;
        }

        console.log(registerData);

        // Later
        // Axios Register API
        navigate("/waiting-approval");
    };

    return (
        <div className="login-page">

            <div className="login-container">

                {/* Left Section */}

                <div className="left-section">

                    <img
                        src={loginImage}
                        alt="Adoption"
                        className="login-image"
                    />

                </div>

                {/* Right Section */}

                <div className="right-section">

                    {/* Logo */}

                    <div className="logo-container">

                        <img
                            src={logo}
                            alt="AdoptEase"
                            className="logo-icon"
                        />


                    </div>

                    {/* Form Wrapper - centers everything below logo */}

                    <div className="form-wrapper">

                        {/* Heading */}

                        <h1>Hello!!</h1>

                        <p className="welcome-text">
                            Welcome to the AdoptEase!!
                        </p>

                        {/* Form */}

                        <form onSubmit={handleRegister}>

                            <InputField
                                variant="login"
                                placeholder="Enter username"
                                name="username"
                                value={registerData.username}
                                onChange={handleChange}
                            />

                            <PasswordField
                                variant="login"
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={registerData.password}
                                onChange={handleChange}
                            />

                            <PasswordField
                                variant="login"
                                type="password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={registerData.confirmPassword}
                                onChange={handleChange}
                            />

                            <div className="forgot-password">

                                <Link to="#">
                                    Recovery password
                                </Link>

                            </div>

                            {/* Captcha Placeholder */}

                            <div className="captcha-box">

                                <div className="captcha-left">

                                    <input
                                        type="checkbox"
                                        checked={isVerified}
                                        onChange={() => setIsVerified(!isVerified)}
                                        className="captcha-checkbox"
                                    />

                                    <span>I'm not a robot</span>

                                </div>

                                <div className="captcha-right">

                                    <div className="recaptcha-logo">reCAPTCHA</div>

                                    <div className="recaptcha-links">Privacy - Terms</div>

                                </div>

                            </div>

                            <PrimaryButton type="submit">
                                Register Now
                            </PrimaryButton>

                        </form>

                        {/* Login Link */}

                        <p className="register-text">

                            Already a member?{" "}

                            <Link to="/">

                                Login now

                            </Link>

                        </p>

                        {/* Role Buttons */}

                        <div className="role-buttons">

                            <button
                                className="parent-btn"
                                onClick={() => navigate("/parent/registration")}
                            >
                                Parents
                            </button>

                            <button
                                className="center-btn"
                                onClick={() => navigate("/center/registration")}
                            >
                                Adoption Center
                            </button>

                            <button className="admin-btn">

                                Admin

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;