import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ChildBasicInfo from "./ChildBasicInfo";
import ChildMedicalInfo from "./ChildMedicalInfo";
import ChildPhotoUpload from "./ChildPhotoUpload";

import "../../pages/center/ChildForm.css";

function ChildForm({

    title,

    initialData = {},

    onSubmit

}) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: initialData.name || "",

        age: initialData.age || "",

        gender: initialData.gender || "",

        status: "Available",

        health: initialData.health || "",

        bloodGroup: initialData.bloodGroup || "",

        medicalCondition: initialData.medicalCondition || "",

        description: initialData.description || "",

        image: null

    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleImage = (e) => {

        setFormData({

            ...formData,

            image: e.target.files[0]

        });

    };

    const validate = () => {

        let newErrors = {};

        if (!formData.name.trim()) {

            newErrors.name = "Child name is required.";

        }

        if (!formData.age) {

            newErrors.age = "Age is required.";

        }

        if (!formData.gender) {

            newErrors.gender = "Gender is required.";

        }

        if (!formData.health.trim()) {

            newErrors.health = "Health status is required.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate()) {

            return;

        }

        if (onSubmit) {

            onSubmit(formData);

        }

        alert(

            title === "Add New Child"

                ? "Child added successfully."

                : "Child updated successfully."

        );

        navigate("/center/all-children");

    };

    return (

        <div className="child-form-container">

            <h1>

                {title}

            </h1>

            <form

                className="child-form"

                onSubmit={handleSubmit}

            >

                <ChildBasicInfo

                    title={title}

                    formData={formData}

                    handleChange={handleChange}

                    errors={errors}

                />

                <ChildMedicalInfo

                    formData={formData}

                    handleChange={handleChange}

                    errors={errors}

                />

                <ChildPhotoUpload

                    handleImage={handleImage}

                />

                <div className="form-buttons">

                    <button

                        type="button"

                        className="cancel-btn"

                        onClick={() => navigate("/center/all-children")}

                    >

                        Cancel

                    </button>

                    <button

                        type="submit"

                        className="save-btn"

                    >

                        {

                            title === "Add New Child"

                                ? "Add Child"

                                : "Save Changes"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

}

export default ChildForm;