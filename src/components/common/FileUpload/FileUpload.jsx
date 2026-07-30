import "./FileUpload.css";

function FileUpload({
    label,
    name,
    onChange,
    accept,
    required = false,
    selectedFile,
}) {
    return (
        <div className="file-upload">

            {label && (
                <label htmlFor={name}>
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}

            <input
                id={name}
                type="file"
                name={name}
                accept={accept}
                onChange={onChange}
            />

            {selectedFile && (
                <p className="file-name">
                    Selected File: {selectedFile.name}
                </p>
            )}

        </div>
    );
}

export default FileUpload;