import { useState } from "react";
import "./CenterHome.css";

import CenterLayout from "../../layouts/CenterLayout";

import HomeContent from "../../components/common/HomeContent";
import ApprovalStatusCard from "../../components/common/Sidebar/ApprovalStatusCard";
import NextStepCard from "../../components/common/Sidebar/NextStepCard";
import ProcedureCard from "../../components/common/Sidebar/ProcedureCard";

import bannerImage from "../../assets/images/center-home.jpg";

function CenterHome() {

    const [acceptedNotice, setAcceptedNotice] = useState(false);

    return (

        <CenterLayout>

            <div className="center-home">

                <HomeContent
                    image={bannerImage}
                    heading="Welcome Adoption Center !!"
                    paragraphs={[
                        "Your center plays a vital role in giving children a second chance at family and belonging. AdoptEase helps you reach genuine, prepared parents by giving you a simple way to showcase the children under your care.",
                        "Add child profiles, manage meeting requests, and track adoption progress, all from one dashboard built for your convenience. We connect you with parents who have already taken steps toward responsible adoption.",
                        "Every feature here exists to support your center's mission, not complicate it. Let's work together to help more children find the homes they deserve.",
                    ]}
                    noticeChecked={acceptedNotice}
                    onNoticeChange={() =>
                        setAcceptedNotice(prev => !prev)
                    }
                />

                <div className="center-sidebar">

                    <ApprovalStatusCard status="Pending" />

                    <NextStepCard
                        pending="Please wait while our team verifies your submitted documents."
                        approved="Your center is approved. You can now add children and manage meeting requests."
                        rejected="Please review your submitted documents, update the required information and submit again."
                    />

                    <ProcedureCard
                        description="Keep your CARA registration updated before managing child records."
                        onViewProcedure={() => alert("Procedure Page")}
                    />

                </div>

            </div>

        </CenterLayout>

    );

}

export default CenterHome;