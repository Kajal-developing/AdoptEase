import { useState } from "react";
import "./CenterRegistration.css";
import logo from "../../assets/logo/logo.svg";
import { useNavigate } from "react-router-dom";
import { registerCenter, loginUser } from "../../api/authApi";

function CenterRegistration() {
    const navigate = useNavigate();

    const registerData =
        JSON.parse(localStorage.getItem("registerData")) || {};

    const [formData, setFormData] = useState({
        centerName: "",
        licenseNumber: "",
        description: "",
        contactNo: "",
        city: "",
        address: "",
        centerPhoto: null,
    });

    const [error, setError] = useState("");

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

        if (!formData.centerName.trim()) {
            setError("Please enter the adoption center name.");
            return;
        }

        if (!formData.licenseNumber.trim()) {
            setError("Please enter the license number.");
            return;
        }

        if (!formData.description.trim()) {
            setError("Please enter the center description.");
            return;
        }

        if (!formData.contactNo.trim()) {
            setError("Please enter the contact number.");
            return;
        }

        if (!/^\d{10}$/.test(formData.contactNo)) {
            setError("Contact number must contain exactly 10 digits.");
            return;
        }

        if (!formData.city.trim()) {
            setError("Please enter the city.");
            return;
        }

        if (!formData.address.trim()) {
            setError("Please enter the address.");
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

            userName: formData.centerName,

            centerName: formData.centerName,

            email: registerData.email,

            password: registerData.password,

            licenseNo: formData.licenseNumber,

            description: formData.description,

            contactNo: formData.contactNo,

            city: formData.city,

            address: formData.address,

            latitude: 0.0,

            longitude: 0.0

        };

        try {

            await registerCenter(
                request,
                formData.centerPhoto
            );

            const loginResponse = await loginUser({
                email: registerData.email,
                password: registerData.password
            });

            localStorage.setItem(
                "user",
                JSON.stringify(loginResponse.data)
            );

            localStorage.setItem(
                "token",
                loginResponse.data.token
            );

            localStorage.removeItem("registerData");

            navigate("/center/home");

        }
        catch (error) {

            console.error(
                "Center Registration Error:",
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

        <div className="center-register-page">

            <div className="register-logo">

                <img
                    src={logo}
                    alt="AdoptEase"
                />

            </div>

            <h1 className="register-heading">

                Register Information

            </h1>

            <form
                className="center-register-form"
                onSubmit={handleSubmit}
            >

                <div className="register-columns">

                    {/* LEFT */}

                    <div className="register-column">

                        <div className="form-group">

                            <label>
                                Adoption Center Name <span className="required-star">*</span>
                            </label>

                            <input
                                type="text"
                                name="centerName"
                                value={formData.centerName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                License Number <span className="required-star">*</span>
                            </label>

                            <input
                                type="text"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Description <span className="required-star">*</span>
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Contact No. <span className="required-star">*</span>
                            </label>

                            <input
                                type="tel"
                                name="contactNo"
                                value={formData.contactNo}
                                onChange={handleChange}
                                maxLength="10"
                            />

                        </div>

                    </div>

                    {/* RIGHT */}

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
                                value={formData.address}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">
                            <label>Latitude</label>

                            <input
                                type="number"
                                step="any"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                                placeholder="e.g. 18.520430"
                            />
                        </div>

                        <div className="form-group">
                            <label>Longitude</label>

                            <input
                                type="number"
                                step="any"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                                placeholder="e.g. 73.856744"
                            />
                        </div>

                        <div className="form-group">

                            <label>Upload Center photo</label>

                            <input
                                className="upload-input"
                                type="file"
                                name="centerPhoto"
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

export default CenterRegistration;