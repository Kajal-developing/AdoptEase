import CenterWideLayout from "../../layouts/CenterWideLayout";
import ChildHero from "../../components/ChildHero/ChildHero";
import { ChildForm } from "../../components/ChildForm";

import { addChild } from "../../api/authApi";

function AddChild() {

    const handleSubmit = async (data) => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const childData = {

                childName: data.name,

                dateOfBirth: (() => {

                    const today = new Date();

                    const age = Number(data.age);

                    return `${today.getFullYear() - age}-01-01`;

                })(),

                gender: data.gender.toUpperCase(),

                healthStatus: data.health,

                description: data.description

            };

            await addChild(
                user.userId,
                childData,
                data.image
            );

            alert("Child added successfully.");

        }
        catch (error) {

            console.log(
                "Add Child Error:",
                error
            );

            console.log(
                "Response:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to add child."
            );

            throw error;
        }

    };

    return (

        <CenterWideLayout>

            <ChildHero
                title="Add New Child"
                parentPage="All Children"
                currentPage="Add New Child"
            />

            <div className="child-form-page">

                <ChildForm
                    title="Add New Child"
                    onSubmit={handleSubmit}
                />

            </div>

        </CenterWideLayout>

    );
}

export default AddChild;