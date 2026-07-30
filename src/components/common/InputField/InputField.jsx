import "./InputField.css";

function InputField({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
}) {
    return (
        <div className="input-field">

            {label && (
                <label htmlFor={name}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}

            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />

        </div>
    );
}

export default InputField;