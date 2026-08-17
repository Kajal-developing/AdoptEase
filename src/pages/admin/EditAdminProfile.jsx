import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import "./AdminProfile.css";

import {
    getAdminProfile,
    updateAdminProfile
} from "../../api/authApi";

import { useNavigate } from "react-router-dom";

function EditAdminProfile() {

    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        contactNo: ""
    });

    const [loading, setLoading] = useState(true);

    const [showSuccess, setShowSuccess] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const response =
                    await getAdminProfile(user.userId);

                setFormData({
                    userName: response.data.userName || "",
                    email: response.data.email || "",
                    contactNo: response.data.contactNo || ""
                });

            } catch (error) {

                console.error(
                    "Unable to load admin profile:",
                    error
                );

                setError(
                    "Unable to load admin profile."
                );

            } finally {

                setLoading(false);

            }
        };

        if (user.userId) {
            loadProfile();
        }

    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            await updateAdminProfile(
                user.userId,
                formData
            );

            // Update localStorage user information
            const updatedUser = {
                ...user,
                userName: formData.userName,
                email: formData.email
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setShowSuccess(true);

        } catch (error) {

            console.error(
                "Admin profile update failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update profile."
            );
        }
    };

    if (loading) {

        return (
            <AdminLayout>

                <div
                    style={{
                        textAlign: "center",
                        padding: "150px 20px"
                    }}
                >
                    Loading...
                </div>

            </AdminLayout>
        );
    }

    return (

        <AdminLayout>

            <div
                style={{
                    maxWidth: "700px",
                    margin: "80px auto",
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "16px",
                    boxShadow: "0 10px 25px rgba(0,0,0,.08)"
                }}
            >

                <h2
                    style={{
                        marginBottom: "30px",
                        color: "#202020"
                    }}
                >
                    Edit Admin Profile
                </h2>

                {error && (

                    <div
                        style={{
                            color: "#D32F2F",
                            background: "#FDECEC",
                            padding: "12px 15px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            fontWeight: "600"
                        }}
                    >
                        {error}
                    </div>

                )}

                <div className="form-group">

                    <label>Name</label>

                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Phone</label>

                    <input
                        type="text"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="button"
                    className="edit-profile-btn"
                    onClick={handleSubmit}
                >
                    Save Changes
                </button>

            </div>

            {showSuccess && (

                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.35)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999
                    }}
                >

                    <div
                        style={{
                            background: "#fff",
                            width: "400px",
                            padding: "35px",
                            borderRadius: "18px",
                            textAlign: "center",
                            boxShadow: "0 15px 40px rgba(0,0,0,.2)"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "45px",
                                marginBottom: "10px"
                            }}
                        >
                            ✓
                        </div>

                        <h2
                            style={{
                                color: "#202020",
                                marginBottom: "10px"
                            }}
                        >
                            Profile Updated
                        </h2>

                        <p
                            style={{
                                color: "#666",
                                marginBottom: "25px"
                            }}
                        >
                            Your admin profile has been
                            updated successfully.
                        </p>

                        <button
                            className="edit-profile-btn"
                            onClick={() =>
                                navigate("/admin/profile")
                            }
                        >
                            Continue
                        </button>

                    </div>

                </div>

            )}

        </AdminLayout>
    );
}

export default EditAdminProfile;