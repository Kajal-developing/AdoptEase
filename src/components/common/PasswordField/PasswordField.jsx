import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./PasswordField.css";

function PasswordField({
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
}) {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="password-field">

            {label && (
                <label htmlFor={name}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}

            <div className="password-input">

                <input
                    id={name}
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                />

                <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

            </div>

        </div>

    );

}

export default PasswordField;