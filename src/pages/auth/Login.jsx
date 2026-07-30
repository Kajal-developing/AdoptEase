import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import InputField from "../../components/common/InputField";
import PasswordField from "../../components/common/PasswordField";
import PrimaryButton from "../../components/common/PrimaryButton";

import "./Login.css";

// Import Images
import loginImage from "../../assets/images/login image.jpg";
import logo from "../../assets/logo/logo.svg";

function Login() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const [isVerified, setIsVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState("Parent");
    const handleLogin = (e) => {
        e.preventDefault();

        console.log(loginData);

        // Later
        // Axios Login API
        navigate("/parent/home");
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
                            Welcome back you've been missed!
                        </p>

                        {/* Form */}

                        <form onSubmit={handleLogin}>

                            <InputField
                                variant="login"
                                placeholder="Enter username"
                                name="username"
                                value={loginData.username}
                                onChange={handleChange}
                            />

                            <PasswordField
                                variant="login"
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={loginData.password}
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
                                Log In
                            </PrimaryButton>

                        </form>

                        {/* Register */}

                        <p className="register-text">

                            Not a member?{" "}

                            <Link to="/register">

                                Register now

                            </Link>

                        </p>

                        {/* Role Buttons */}

                        <div className="role-buttons">

                            <button className="parent-btn">

                                Parents

                            </button>

                            <button className="center-btn">

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

export default Login;