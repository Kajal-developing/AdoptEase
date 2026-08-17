import "./AdoptionProcedure.css";

import ParentWideLayout from "../../layouts/ParentWideLayout";
import CenterLayout from "../../layouts/CenterLayout";
import AdminLayout from "../../layouts/AdminLayout";
import AdoptionProcedureContent from "../../components/common/AdoptionProcedureContent";
import { useLocation } from "react-router-dom";

function AdoptionProcedure() {

    const location = useLocation();

    const Layout = location.pathname.startsWith("/admin")
        ? AdminLayout
        : location.pathname.startsWith("/center")
            ? CenterLayout
            : ParentWideLayout;

    return (

        <Layout>

            <div className="adoption-procedure-page">

                <AdoptionProcedureContent />

            </div>

        </Layout>

    );

}

export default AdoptionProcedure;