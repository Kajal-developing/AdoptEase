import { useState } from "react";
import "./ParentRegistration.css";
import logo from "../../assets/logo/logo.svg";

function ParentRegistration() {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNo: "",
        occupation: "",
        maritalStatus: "",
        annualIncome: "",
        city: "",
        address: "",
        profilePhoto: null,
        housePhoto: null,
        familyPhoto: null,
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        // TODO:
        // Call Spring Boot API here
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
                                Enter Your Full Name
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
                                Phone no
                            </label>

                            <input
                                type="tel"
                                name="phoneNo"
                                value={formData.phoneNo}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>
                                Occupation
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
                                Marital Status
                            </label>

                            <select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select
                                </option>

                                <option value="Single">
                                    Single
                                </option>

                                <option value="Married">
                                    Married
                                </option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>
                                Annual Income
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
                                City
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
                                Address
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
                                Upload Profile photo
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
                                Upload House photo
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
                                Upload Family photo
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