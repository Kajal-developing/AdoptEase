import { useEffect, useState } from "react";
import "./ParentHome.css";
import ParentLayout from "../../layouts/ParentLayout";
import HomeContent from "../../components/common/HomeContent";
import ApprovalStatusCard from "../../components/common/Sidebar/ApprovalStatusCard";
import NextStepCard from "../../components/common/Sidebar/NextStepCard";
import ProcedureCard from "../../components/common/Sidebar/ProcedureCard";
import bannerImage from "../../assets/images/family-home.jpg";
import { useNavigate } from "react-router-dom";
import { getParentProfile } from "../../api/authApi";

function ParentHome() {

    const [parentProfile, setParentProfile] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    const [acceptedNotice, setAcceptedNotice] = useState(() => {
        return localStorage.getItem(
            `acceptedNotice_${user.userId}`
        ) === "true";
    });

    const navigate = useNavigate();

    const handleNoticeChange = () => {

        setAcceptedNotice(true);

        localStorage.setItem(
            `acceptedNotice_${user.userId}`,
            "true"
        );

    };

    useEffect(() => {

        const fetchParentProfile = async () => {

            try {

                const response =
                    await getParentProfile(user.userId);

                setParentProfile(response.data);

                localStorage.setItem(
                    "parentProfile",
                    JSON.stringify(response.data)
                );

            }

            catch (error) {

                console.error(error);

            }

        };

        fetchParentProfile();

    }, []);

    return (

        <ParentLayout>

            <div className="parent-home">

                <HomeContent
                    image={bannerImage}
                    heading={`Welcome ${parentProfile?.userName || ""} !!`}
                    paragraphs={[
                        "Becoming a parent doesn't always begin with a birth — sometimes, it begins with choice. AdoptEase exists to support that choice, by connecting hopeful parents with adoption centers who care for children in need of a home.",
                        "We know the adoption process can feel confusing or distant, so we've made it easier to find centers near you, learn what's required, and take meaningful steps forward. Every profile you see represents a child hoping for warmth, stability, and love.",
                        "Whether you're just starting to explore adoption or ready to meet a child, we're here to guide you with clarity and care. Your family story could begin here.",
                    ]}
                    noticeChecked={acceptedNotice}
                    onNoticeChange={handleNoticeChange}
                />

                <div className="parent-sidebar">

                    <ApprovalStatusCard
                        status={parentProfile?.approvalStatus || "PENDING"}
                    />

                    <NextStepCard
                        pending="Please wait while our team verifies your submitted documents."
                        approved="After approval, you can browse children and schedule meetings with adoption centers."
                        rejected="If your application is rejected, update the required information and submit it again."
                    />

                    <ProcedureCard
                        description="Read the complete adoption procedure before scheduling your first meeting."
                        onViewProcedure={() =>
                            navigate("/parent/adoption-procedure")
                        }
                    />

                </div>

            </div>

        </ParentLayout>

    );

}

export default ParentHome;