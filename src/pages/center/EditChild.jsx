import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CenterWideLayout from "../../layouts/CenterWideLayout";
import ChildHero from "../../components/ChildHero/ChildHero";
import { ChildForm } from "../../components/ChildForm";

import {
    getCenterChildById,
    updateCenterChild
} from "../../api/authApi";

function EditChild() {

    const { id: childId } = useParams();

    const navigate = useNavigate();

    const [childData, setChildData] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadChild = async () => {

            try {

                const response =
                    await getCenterChildById(childId);

                const child = response.data;

                console.log("Child for Edit:", child);

                let status = "Available";

                if (child.availableStatus === "MEETING_BOOKED") {

                    status = "Reserved";

                }
                else if (child.availableStatus === "ADOPTED") {

                    status = "Adopted";

                }


                setChildData({

                    name: child.childName,

                    age: child.age,

                    dateOfBirth: child.dateOfBirth,

                    gender:
                        child.gender === "FEMALE"
                            ? "Female"
                            : child.gender === "MALE"
                                ? "Male"
                                : "",

                    status: status,

                    health: child.healthStatus,

                    description: child.description,

                    childPhoto: child.childPhoto

                });

            }
            catch (error) {

                console.log(
                    "Get Child Error:",
                    error
                );

                alert(
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to load child details."
                );

                navigate("/center/all-children");

            }
            finally {

                setLoading(false);

            }

        };

        loadChild();

    }, [childId, navigate]);


    const handleSubmit = async (data) => {

        try {

            const formData = new FormData();


            // Basic information

            formData.append(
                "childName",
                data.name
            );

            formData.append(
                "dateOfBirth",
                data.dateOfBirth
            );

            formData.append(
                "gender",
                data.gender.toUpperCase()
            );

            formData.append(
                "healthStatus",
                data.health
            );

            formData.append(
                "description",
                data.description
            );


            // Status

            let backendStatus = "AVAILABLE";

            if (data.status === "Reserved") {

                backendStatus = "MEETING_BOOKED";

            }
            else if (data.status === "Adopted") {

                backendStatus = "ADOPTED";

            }

            formData.append(
                "availableStatus",
                backendStatus
            );


            // New image

            if (data.image) {

                formData.append(
                    "childPhoto",
                    data.image
                );

            }


            console.log(
                "Updating child..."
            );


            const response =
                await updateCenterChild(
                    childId,
                    formData
                );


            console.log(
                "Update Response:",
                response.data
            );

            navigate(
                "/center/all-children"
            );

        }
        catch (error) {

            console.log(
                "Update Child Error:",
                error
            );

            console.log(
                "Response:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Unable to update child."
            );

            throw error;

        }

    };


    if (loading) {

        return (

            <CenterWideLayout>

                <div className="child-form-page">

                    <h2>
                        Loading child details...
                    </h2>

                </div>

            </CenterWideLayout>

        );

    }


    if (!childData) {

        return null;

    }


    return (

        <CenterWideLayout>

            <ChildHero
                title="Edit Child Details"
                parentPage="All Children"
                currentPage="Edit Child Details"
            />

            <div className="child-form-page">

                <ChildForm
                    title="Edit Child"
                    initialData={childData}
                    onSubmit={handleSubmit}
                />

            </div>

        </CenterWideLayout>

    );

}

export default EditChild;