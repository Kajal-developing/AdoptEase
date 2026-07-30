import "./TextAreaField.css";

function TextAreaField({
    label,
    name,
    value,
    onChange,
    placeholder,
    rows = 5,
    required = false,
    disabled = false,
}) {
    return (
        <div className="textarea-field">

            {label && (
                <label htmlFor={name}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}

            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                disabled={disabled}
            />

        </div>
    );
}

export default TextAreaField;