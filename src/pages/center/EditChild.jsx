import CenterLayout from "../../layouts/CenterLayout";

import { ChildForm } from "../../components/ChildForm";

function EditChild() {

    const childData = {

        name: "Heer",

        age: 8,

        gender: "Female",

        status: "Available",

        health: "Healthy",

        description:
            "Fair complexion, likes music and coloring, calm and affectionate."

    };

    const handleSubmit = (data) => {

        console.log(data);

        alert("Child updated successfully.");

    };

    return (

        <CenterLayout>

            <ChildForm

                title="Edit Child"

                initialData={childData}

                onSubmit={handleSubmit}

            />

        </CenterLayout>

    );

}

export default EditChild;