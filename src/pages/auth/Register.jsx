import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkEmail } from "../../api/authApi";
import InputField from "../../components/common/InputField";
import PasswordField from "../../components/common/PasswordField";
import PrimaryButton from "../../components/common/PrimaryButton";
import "./Register.css";


// Import Images
import loginImage from "../../assets/images/login image.jpg";
import logo from "../../assets/logo/logo.svg";

function Register() {
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState("");
    const handleChange = (e) => {

        const { name, value } = e.target;

        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        // Clear previous error
        setError("");

        // Email validation
        if (!registerData.email.trim()) {

            setError("Please enter your email.");

            return;
        }

        // Gmail validation
        if (!registerData.email.toLowerCase().endsWith("@gmail.com")) {

            setError("Please enter a valid Gmail address.");

            return;
        }

        // Password validation
        const passwordPattern =
            /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if (!registerData.password) {

            setError("Please enter your password.");

            return;
        }

        if (!passwordPattern.test(registerData.password)) {

            setError(
                "Password must contain at least 8 characters, one number and one special character."
            );

            return;
        }

        // Confirm password
        if (!registerData.confirmPassword) {

            setError("Please confirm your password.");

            return;
        }

        if (registerData.password !== registerData.confirmPassword) {

            setError("Passwords do not match.");

            return;
        }

        // Role validation
        if (!selectedRole) {

            setError("Please select a role.");

            return;
        }

        // CAPTCHA validation
        if (!isVerified) {

            setError("Please verify that you're not a robot.");

            return;
        }

        // Check email with backend
        try {

            const response = await checkEmail(
                registerData.email
            );

            console.log("Check Email Response:", response.data);

            if (response.data === true) {

                setError(
                    "You have already registered. Please login."
                );

                return;
            }

        }
        catch (error) {

            console.error("CHECK EMAIL ERROR:", error);

            console.log("Status:", error.response?.status);
            console.log("Response:", error.response?.data);
            console.log("URL:", error.config?.url);

            setError(
                error.response?.data?.message ||
                "Unable to verify email. Please try again."
            );

            return;
        }

        // Save email & password temporarily
        localStorage.setItem(
            "registerData",
            JSON.stringify({
                email: registerData.email,
                password: registerData.password
            })
        );

        // Navigate according to role
        if (selectedRole === "PARENT") {

            navigate("/parent/registration");

        }
        else if (selectedRole === "CENTER_ADMIN") {

            navigate("/center/registration");

        }
        else {

            setError(
                "Admin registration is not allowed."
            );
        }
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
                                placeholder="Enter Email"
                                name="email"
                                value={registerData.email}
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

                            {error && (
                                <p className="register-error">
                                    {error}
                                </p>
                            )}

                            {/* Role Buttons */}

                            <div className="register-role-buttons">

                                <button
                                    type="button"
                                    className={`parent-btn ${selectedRole === "PARENT" ? "selected" : ""}`}
                                    onClick={() => setSelectedRole("PARENT")}
                                >
                                    Parents
                                </button>

                                <button
                                    type="button"
                                    className={`center-btn ${selectedRole === "CENTER_ADMIN" ? "selected" : ""}`}
                                    onClick={() => setSelectedRole("CENTER_ADMIN")}
                                >
                                    Adoption Center
                                </button>

                                <button
                                    type="button"
                                    className="admin-btn"
                                    disabled
                                    title="Admin registration is not available"
                                >
                                    Admin
                                </button>

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

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;