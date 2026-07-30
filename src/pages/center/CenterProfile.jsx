import "./CenterProfile.css";

import CenterLayout from "../../layouts/CenterLayout";

import {
    CenterProfileHeader,
    CenterInfoCard,
    AddressCard,
    AccountSettingsCard
} from "../../components/CenterProfile";

function CenterProfile() {

    return (

        <CenterLayout>

            <div className="center-profile-page">

                <CenterProfileHeader />

                <CenterInfoCard />

                <AddressCard />
            
                <AccountSettingsCard />

            </div>

        </CenterLayout>

    );

}

export default CenterProfile;