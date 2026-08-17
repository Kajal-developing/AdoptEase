import "./CenterRequests.css";

import AdminLayout from "../../layouts/AdminLayout";

import {

    HeroSection,

    RequestsGrid

} from "../../components/CenterRequests";

function CenterRequests() {

    return (

        <AdminLayout>

            <div className="center-requests-page">

                <HeroSection />

                <RequestsGrid />

            </div>

        </AdminLayout>

    );

}

export default CenterRequests;