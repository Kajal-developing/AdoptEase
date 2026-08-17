import { useEffect, useState } from "react";
import "./CenterProfile.css";

import CenterLayout from "../../layouts/CenterLayout";

import {
    CenterProfileHeader,
    CenterInfoCard,
    AddressCard,
    AccountSettingsCard
} from "../../components/CenterProfile";

import { getCenterProfile } from "../../api/authApi";

function CenterProfile() {

    const [profile, setProfile] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await getCenterProfile(user.userId);

                console.log("Center Profile:", response.data);
                setProfile(response.data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchProfile();

    }, [user.userId]);

    if (!profile) {
        return null;
    }

    return (

        <CenterLayout>

            <div className="center-profile-page">

                <CenterProfileHeader profile={profile} />

                <CenterInfoCard profile={profile} />

                <AddressCard profile={profile} />

                <AccountSettingsCard profile={profile} />

            </div>

        </CenterLayout>

    );

}

export default CenterProfile;