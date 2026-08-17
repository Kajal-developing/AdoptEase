import "./AdminAbout.css";

import AdminLayout from "../../layouts/AdminLayout";

import {

    HeroSection,
    MissionVision,
    Features,
    TechStack,
    
} from "../../components/AdminAbout";

function AdminAbout() {

    return (

        <AdminLayout>

            <div className="admin-about-page">

                <HeroSection />

                <MissionVision />

                <Features />

                <TechStack />

                
            </div>

        </AdminLayout>

    );

}

export default AdminAbout;