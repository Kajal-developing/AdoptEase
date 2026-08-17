import "./PrivacyPolicy.css";

import { useLocation } from "react-router-dom";

import ParentWideLayout from "../../layouts/ParentWideLayout";
import CenterLayout from "../../layouts/CenterLayout";
import AdminLayout from "../../layouts/AdminLayout";

import {
    HeroSection,
    PrivacyContent
} from "../../components/PrivacyPolicy";

function PrivacyPolicy() {

    const location = useLocation();

    let Layout = ParentWideLayout;

    if (location.pathname.startsWith("/center")) {

        Layout = CenterLayout;

    } else if (location.pathname.startsWith("/admin")) {

        Layout = AdminLayout;

    }

    return (

        <Layout>

            <HeroSection />

            <div className="privacy-page">

                <PrivacyContent />

            </div>

        </Layout>

    );

}

export default PrivacyPolicy;