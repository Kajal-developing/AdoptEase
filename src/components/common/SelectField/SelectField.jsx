import "./SelectField.css";

function SelectField({
    label,
    name,
    value,
    onChange,
    options = [],
    required = false,
    disabled = false,
    placeholder = "Select an option",
}) {
    return (
        <div className="select-field">

            {label && (
                <label htmlFor={name}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                <option value="">
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

        </div>
    );
}

export default SelectField;