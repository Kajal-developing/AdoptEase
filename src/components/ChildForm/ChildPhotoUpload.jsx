import { useState } from "react";

function ChildPhotoUpload({

    handleImage

}) {

    const [preview, setPreview] = useState(null);

    const onFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        handleImage(e);

        setPreview(URL.createObjectURL(file));

    };

    const removeImage = () => {

        setPreview(null);

    };

    return (

        <>

            <h2 className="form-section-title">

                Child Photograph

            </h2>

            <div className="photo-upload-container">

                {

                    preview ?

                        <img

                            src={preview}

                            alt="Child"

                            className="photo-preview"

                        />

                        :

                        <div className="upload-placeholder">

                            <div className="upload-icon">

                                📷

                            </div>

                            <p>

                                Upload Child Photograph

                            </p>

                            <small>

                                JPG, PNG (Max 5 MB)

                            </small>

                        </div>

                }

            </div>

            <div className="photo-buttons">

                <label className="upload-btn">

                    {

                        preview ?

                            "Change Photo"

                            :

                            "Choose Photo"

                    }

                    <input

                        type="file"

                        accept="image/*"

                        hidden

                        onChange={onFileChange}

                    />

                </label>

                {

                    preview &&

                    <button

                        type="button"

                        className="remove-photo-btn"

                        onClick={removeImage}

                    >

                        Remove Photo

                    </button>

                }

            </div>

        </>

    );

}

export default ChildPhotoUpload;