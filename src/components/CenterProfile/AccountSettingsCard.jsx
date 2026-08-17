import "../../pages/center/CenterProfile.css";
import { useState } from "react";
import {
    changeCenterPassword,
    deactivateCenterAccount
} from "../../api/authApi";

function AccountSettingsCard() {

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const user = JSON.parse(localStorage.getItem("user"));

    const handleChange = (e) => {

        const { name, value } = e.target;

        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSave = async () => {

        if (!passwordData.currentPassword) {
            alert("Please enter current password.");
            return;
        }

        if (!passwordData.newPassword) {
            alert("Please enter new password.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            const response = await changeCenterPassword(
                user.userId,
                {
                    oldPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                }
            );

            alert(response.data);

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (error) {

            console.log("Change Password Error:", error);
            console.log("Response:", error.response?.data);
            console.log("Status:", error.response?.status);

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to change password."
            );
        }
    };

    const [showDeactivatePopup, setShowDeactivatePopup] = useState(false);

    const handleDeactivate = () => {

        setShowDeactivatePopup(true);

    };

    const confirmDeactivate = async () => {

        try {

            const response = await deactivateCenterAccount(
                user.userId
            );


            localStorage.removeItem("user");
            localStorage.removeItem("token");

            localStorage.removeItem(
                `centerNoticeAccepted_${user.userId}`
            );

            localStorage.removeItem(
                `approvalStatus_${user.userId}`
            );

            window.location.href = "/register";

        }
        catch (error) {

            console.log(
                "Deactivate Account Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to deactivate account."
            );

        }

    };

    return (

        <>

            <section className="profile-card">

                <div className="card-header">

                    <h2>Account Settings</h2>

                </div>

                <div className="info-grid">

                    <div className="info-item">

                        <label>Current Password</label>

                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Enter current password"
                            value={passwordData.currentPassword}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="info-item">

                        <label>New Password</label>

                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter new password"
                            value={passwordData.newPassword}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="info-item">

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={passwordData.confirmPassword}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="account-buttons">

                    <button
                        className="save-btn"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>

                    <button
                        className="deactivate-btn"
                        onClick={handleDeactivate}
                    >
                        Deactivate Account
                    </button>

                </div>

            </section>


            {showDeactivatePopup && (

                <div className="deactivate-overlay">

                    <div className="deactivate-popup">

                        <h2>Deactivate Account?</h2>

                        <p>
                            Are you sure you want to deactivate your account?
                        </p>

                        <p className="deactivate-warning">
                            You will no longer be able to access your
                            adoption center account.
                        </p>

                        <div className="deactivate-popup-buttons">

                            <button
                                className="cancel-deactivate-btn"
                                onClick={() =>
                                    setShowDeactivatePopup(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-deactivate-btn"
                                onClick={confirmDeactivate}
                            >
                                Yes, Deactivate
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>

    );

}

export default AccountSettingsCard;