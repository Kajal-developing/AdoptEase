import { useState } from "react";
import "./CenterRegistration.css";
import logo from "../../assets/logo/logo.svg";

function CenterRegistration() {

    const [formData, setFormData] = useState({
        centerName: "",
        licenseNumber: "",
        description: "",
        contactNo: "",
        city: "",
        address: "",
        centerPhoto: null,
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

        // TODO : Spring Boot API

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

                            <label>Adoption Center Name</label>

                            <input
                                type="text"
                                name="centerName"
                                value={formData.centerName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>License Number</label>

                            <input
                                type="text"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Description</label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Contact No.</label>

                            <input
                                type="tel"
                                name="contactNo"
                                value={formData.contactNo}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="register-column">

                        <div className="form-group">

                            <label>City</label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">

                            <label>Address</label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
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