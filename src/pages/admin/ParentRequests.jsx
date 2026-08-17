import "./ParentRequests.css";

import AdminLayout from "../../layouts/AdminLayout";

import {

    HeroSection,

    RequestsGrid

} from "../../components/ParentRequests";

function ParentRequests() {

    return (

        <AdminLayout>

            <div className="parent-requests-page">

                <HeroSection />

                <RequestsGrid />

            </div>

        </AdminLayout>

    );

}

export default ParentRequests;