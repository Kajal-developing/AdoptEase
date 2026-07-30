import CenterLayout from "../../layouts/CenterLayout";

import { ChildForm } from "../../components/ChildForm";

function AddChild() {

    const handleSubmit = (data) => {

        console.log(data);

        alert("Child added successfully.");

    };

    return (

        <CenterLayout>

            <ChildForm

                title="Add New Child"

                onSubmit={handleSubmit}

            />

        </CenterLayout>

    );

}

export default AddChild;