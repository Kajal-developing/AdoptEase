import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";

import InputField from "../../components/common/InputField";
import PasswordField from "../../components/common/PasswordField";
import PrimaryButton from "../../components/common/PrimaryButton";

import "./Login.css";

// Images
import loginImage from "../../assets/images/login image.jpg";
import logo from "../../assets/logo/logo.svg";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [selectedRole, setSelectedRole] = useState("");

    const [isVerified, setIsVerified] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "email") {
            setEmailError("");
            setLoginError("");
        }

        if (name === "password") {
            setPasswordError("");
            setLoginError("");
        }
    };

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        // Clear previous error
        setLoginError("");

        // Email validation
        if (!loginData.email.trim()) {

            setLoginError("Please enter your email.");

            return;
        }

        if (!loginData.email.toLowerCase().endsWith("@gmail.com")) {

            setLoginError("Please enter a valid Gmail address.");

            return;
        }

        // Password validation
        if (!loginData.password.trim()) {

            setLoginError("Please enter your password.");

            return;
        }

        // Password must contain number and special character
        const passwordPattern =
            /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

        if (!passwordPattern.test(loginData.password)) {

            setLoginError(
                "Password must contain at least one number and one special character."
            );

            return;
        }

        // Role validation
        if (!selectedRole) {

            setLoginError("Please select your role.");

            return;
        }

        // CAPTCHA validation
        if (!isVerified) {

            setLoginError("Please verify that you're not a robot.");

            return;
        }

        try {

            const response = await loginUser({

                email: loginData.email,

                password: loginData.password

            });

            console.log(response.data);

            const user = response.data;

            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            // Save JWT Token
            localStorage.setItem(
                "token",
                user.token
            );

            // Save approval status
            localStorage.setItem(
                `approvalStatus_${user.userId}`,
                user.approvalStatus
            );

            // Validate role
            if (user.role !== selectedRole) {

                setLoginError(
                    "Selected role does not match your account."
                );

                return;
            }

            // Navigate
            if (user.role === "PARENT") {

                navigate("/parent/home");

            }
            else if (user.role === "CENTER_ADMIN") {

                navigate("/center/home");

            }
            else if (user.role === "ADMIN") {

                navigate("/admin/home");

            }

        }
        catch (error) {

            console.log("Login Error:", error);
            console.log("Response:", error.response?.data);

            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to login.";

            setLoginError(message);

        }

    };

    return (

        <div className="login-page">

            <div className="login-container">

                {/* Left */}

                <div className="left-section">

                    <img
                        src={loginImage}
                        alt="Adoption"
                        className="login-image"
                    />

                </div>

                {/* Right */}

                <div className="right-section">

                    <div className="logo-container">

                        <img
                            src={logo}
                            alt="AdoptEase"
                            className="logo-icon"
                        />

                    </div>

                    <div className="form-wrapper">

                        <h1>Hello!!</h1>

                        <p className="welcome-text">

                            Welcome back you've been missed!

                        </p>

                        <form onSubmit={handleLogin}>

                            <InputField
                                variant="login"
                                placeholder="Enter Email"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                            />

                            <PasswordField
                                variant="login"
                                placeholder="Enter password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                            />
                       


                            {/* Captcha */}

                            <div className="captcha-box">

                                <div className="captcha-left">

                                    <input
                                        type="checkbox"
                                        checked={isVerified}
                                        onChange={() =>
                                            setIsVerified(!isVerified)
                                        }
                                        className="captcha-checkbox"
                                    />

                                    <span>

                                        I'm not a robot

                                    </span>

                                </div>

                                <div className="captcha-right">

                                    <div className="recaptcha-logo">

                                        reCAPTCHA

                                    </div>

                                    <div className="recaptcha-links">

                                        Privacy - Terms

                                    </div>

                                </div>

                            </div>
                            
                            {loginError && (
                                <p className="login-error">
                                    {loginError}
                                </p>
                            )}
                            {/* Role */}

                            <div className="role-buttons">

                                <button
                                    type="button"
                                    className={
                                        selectedRole === "PARENT"
                                            ? "parent-btn active"
                                            : "parent-btn"
                                    }
                                    onClick={() =>
                                        setSelectedRole("PARENT")
                                    }
                                >
                                    Parents
                                </button>

                                <button
                                    type="button"
                                    className={
                                        selectedRole === "CENTER_ADMIN"
                                            ? "center-btn active"
                                            : "center-btn"
                                    }
                                    onClick={() =>
                                        setSelectedRole("CENTER_ADMIN")
                                    }
                                >
                                    Adoption Center
                                </button>

                                <button
                                    type="button"
                                    className={
                                        selectedRole === "ADMIN"
                                            ? "admin-btn active"
                                            : "admin-btn"
                                    }
                                    onClick={() =>
                                        setSelectedRole("ADMIN")
                                    }
                                >
                                    Admin
                                </button>

                            </div>

                            <PrimaryButton type="submit">

                                Log In

                            </PrimaryButton>

                        </form>

                        <p className="register-text">

                            Not a member?{" "}

                            <Link to="/register">

                                Register now

                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;