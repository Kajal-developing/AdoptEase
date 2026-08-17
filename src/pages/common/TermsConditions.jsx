import "./TermsConditions.css";

import ParentLayout from "../../layouts/ParentLayout";
import CenterLayout from "../../layouts/CenterLayout";
import AdminLayout from "../../layouts/AdminLayout";

import TermsConditionsContent from "../../components/common/TermsConditionsContent";

import { useLocation } from "react-router-dom";

function TermsConditions() {

    const location = useLocation();

    const Layout = location.pathname.startsWith("/admin")
        ? AdminLayout
        : location.pathname.startsWith("/center")
            ? CenterLayout
            : ParentLayout;

    return (

        <Layout>

            <div className="terms-page">

                <TermsConditionsContent />

            </div>

        </Layout>

    );

}

export default TermsConditions;