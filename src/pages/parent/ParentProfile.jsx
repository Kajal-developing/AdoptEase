import "./ParentProfile.css";

import ParentLayout from "../../layouts/ParentLayout";

import ParentProfileHeader from "../../components/ParentProfile/ParentProfileHeader";
import PersonalInfoCard from "../../components/ParentProfile/PersonalInfoCard";
import AddressCard from "../../components/ParentProfile/AddressCard";
import DocumentsCard from "../../components/ParentProfile/DocumentsCard";
import AccountSettingsCard from "../../components/ParentProfile/AccountSettingsCard";

function ParentProfile() {

    return (

        <ParentLayout>

            <div className="parent-profile-page">

                <ParentProfileHeader />

                <PersonalInfoCard />

                <AddressCard />

                <DocumentsCard />

                <AccountSettingsCard />

            </div>

        </ParentLayout>

    );

}

export default ParentProfile;