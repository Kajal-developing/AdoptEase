import { useState } from "react";
import "./ParentRegistration.css";
import logo from "../../assets/logo/logo.svg";
import { useNavigate } from "react-router-dom";
import { registerParent, loginUser } from "../../api/authApi";

function ParentRegistration() {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNo: "",
        age: "",
        occupation: "",
        maritalStatus: "",
        annualIncome: "",
        city: "",
        address: "",
        profilePhoto: null,
        housePhoto: null,
        familyPhoto: null,
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const registerData =
        JSON.parse(localStorage.getItem("registerData")) || {};

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        // Required field validation

        if (!formData.fullName.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!formData.phoneNo.trim()) {
            setError("Please enter your phone number.");
            return;
        }

        if (!/^\d{10}$/.test(formData.phoneNo)) {
            setError("Contact number must contain exactly 10 digits.");
            return;
        }

        if (!formData.age) {
            setError("Please enter your age.");
            return;
        }

        if (Number(formData.age) < 21) {
            setError("Age must be at least 21.");
            return;
        }

        if (!formData.occupation.trim()) {
            setError("Please enter your occupation.");
            return;
        }

        if (!formData.annualIncome) {
            setError("Please enter your annual income.");
            return;
        }

        if (!formData.maritalStatus) {
            setError("Please select your marital status.");
            return;
        }

        if (!formData.gender) {
            setError("Please select your gender.");
            return;
        }

        if (!formData.city.trim()) {
            setError("Please enter your city.");
            return;
        }

        if (!formData.address.trim()) {
            setError("Please enter your address.");
            return;
        }

        if (!formData.profilePhoto) {
            setError("Please upload your profile photo.");
            return;
        }

        if (!formData.housePhoto) {
            setError("Please upload your house photo.");
            return;
        }

        if (!formData.familyPhoto) {
            setError("Please upload your family photo.");
            return;
        }

        // Check first registration step

        if (!registerData.email || !registerData.password) {

            setError(
                "Please complete the registration details first."
            );

            return;
        }

        const request = {

            userName: formData.fullName,

            email: registerData.email,

            password: registerData.password,

            contactNo: formData.phoneNo,

            address: formData.address,

            city: formData.city,

            age: Number(formData.age),

            occupation: formData.occupation,

            annualIncome: formData.annualIncome,

            maritalStatus: formData.maritalStatus,

            gender: formData.gender
        };

        try {

            await registerParent(
                request,
                formData.profilePhoto,
                formData.housePhoto,
                formData.familyPhoto
            );

            // Automatically login
            const loginResponse = await loginUser({
                email: registerData.email,
                password: registerData.password
            });

            // Store logged-in user & JWT
            localStorage.setItem(
                "user",
                JSON.stringify(loginResponse.data)
            );

            localStorage.setItem(
                "token",
                loginResponse.data.token
            );

            localStorage.removeItem("registerData");

            navigate("/parent/home");

        }
        catch (error) {

            console.error(
                "Parent Registration Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data ||
                "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="parent-register-page">

            {/* Logo */}

            <div className="register-logo">

                <img src={logo} alt="AdoptEase" />

            </div>

            {/* Heading */}

            <h1 className="register-heading">
                Register Information
            </h1>

            {/* Form */}

            <form
                className="parent-register-form"
                onSubmit={handleSubmit}
            >

                <div className="register-columns">

                    {/* LEFT COLUMN */}

                    <div className="register-column">

                        <div className="form-group">

                            <label>
                                Enter Your Full Name <span className="required-star">*</span>
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Phone no <span className="required-star">*</span>
                            </label>

                            <input
                                type="tel"
                                name="phoneNo"
                                value={formData.phoneNo}
                                onChange={handleChange}
                                maxLength="10"
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Age <span className="required-star">*</span>
                            </label>

                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Occupation <span className="required-star">*</span>
                            </label>

                            <input
                                type="text"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Marital Status <span className="required-star">*</span>
                            </label>

                            <select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                            >

                                <option value="">Select</option>

                                <option value="SINGLE">
                                    Single
                                </option>

                                <option value="MARRIED">
                                    Married
                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>
                                Gender <span className="required-star">*</span>
                            </label>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>
                                Annual Income <span className="required-star">*</span>
                            </label>

                            <input
                                type="number"
                                name="annualIncome"
                                value={formData.annualIncome}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* RIGHT COLUMN */}

                    <div className="register-column">

                        <div className="form-group">

                            <label>
                                City <span className="required-star">*</span>
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Address <span className="required-star">*</span>
                            </label>

                            <textarea
                                name="address"
                                rows="5"
                                value={formData.address}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Upload Profile Photo <span className="required-star">*</span>
                            </label>

                            <input
                                className="upload-input"
                                type="file"
                                name="profilePhoto"
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Upload House Photo <span className="required-star">*</span>
                            </label>

                            <input
                                className="upload-input"
                                type="file"
                                name="housePhoto"
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Upload Family Photo <span className="required-star">*</span>
                            </label>

                            <input
                                className="upload-input"
                                type="file"
                                name="familyPhoto"
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>

                {error && (
                    <p className="registration-error">
                        {error}
                    </p>
                )}

                <div className="button-container">

                    <button
                        type="submit"
                        className="register-button"
                    >
                        Register
                    </button>

                </div>

            </form>

        </div>
    );
}

export default ParentRegistration;