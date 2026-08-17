import { useState } from "react";
import "./ParentProfile.css";

function ChangePasswordModal({

    isOpen,
    onClose,
    onSave

}) {

    const [form, setForm] = useState({

        oldPassword: "",
        newPassword: "",
        confirmPassword: ""

    });

    if (!isOpen) return null;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

    };

    const handleSubmit = () => {

        if (form.newPassword !== form.confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        onSave(form);

        setForm({

            oldPassword: "",
            newPassword: "",
            confirmPassword: ""

        });

    };

    return (

        <div className="modal-overlay">

            <div className="password-modal">

                <h2>Change Password</h2>

                <input
                    type="password"
                    placeholder="Current Password"
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />

                <div className="modal-buttons">

                    <button
                        className="secondary-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="secondary-button editing-button"
                        onClick={handleSubmit}
                    >
                        Update Password
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ChangePasswordModal;