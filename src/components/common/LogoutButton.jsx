import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

function LogoutButton() {

    const navigate = useNavigate();

    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = () => {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        // Remove JWT token
        localStorage.removeItem("token");

        // Remove logged-in user data
        localStorage.removeItem("user");

        // Remove approval status
        if (user?.userId) {
            localStorage.removeItem(
                `approvalStatus_${user.userId}`
            );
        }

        // Clear session storage
        sessionStorage.clear();

        // Redirect to login
        navigate("/", { replace: true });
    };

    return (
        <>
            {/* Logout Button */}
            <button
                className="logout-button"
                onClick={() => setShowConfirm(true)}
            >
                <span className="logout-icon">↪</span>
                Logout
            </button>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="logout-modal-overlay">

                    <div className="logout-modal">

                        <div className="logout-modal-icon">
                            ↪
                        </div>

                        <h2>Confirm Logout</h2>

                        <p>
                            Are you sure you want to logout?
                        </p>

                        <div className="logout-modal-buttons">

                            <button
                                className="cancel-logout-button"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="confirm-logout-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}

export default LogoutButton;