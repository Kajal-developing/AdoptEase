import "./PrimaryButton.css";

function PrimaryButton({
    children,
    type = "button",
    onClick,
    disabled = false,
    fullWidth = false,
}) {
    return (
        <button
            type={type}
            className={`primary-button ${fullWidth ? "full-width" : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;