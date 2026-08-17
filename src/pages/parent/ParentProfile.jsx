import "./ParentProfile.css";
import ParentLayout from "../../layouts/ParentLayout";
import ParentProfileHeader from "../../components/ParentProfile/ParentProfileHeader";
import PersonalInfoCard from "../../components/ParentProfile/PersonalInfoCard";
import AddressCard from "../../components/ParentProfile/AddressCard";
import DocumentsCard from "../../components/ParentProfile/DocumentsCard";
import AccountSettingsCard from "../../components/ParentProfile/AccountSettingsCard";
import ParentPhotosCard from "../../components/ParentProfile/ParentPhotosCard";
import { useEffect, useState } from "react";
import {
    getParentProfile,
    updateParentProfile,
    changePassword,
    updateParentHousePhoto,
    updateParentFamilyPhoto
} from "../../api/authApi";
import ChangePasswordModal
    from "../../components/ParentProfile/ChangePasswordModal";
import SuccessModal from "../../components/common/SuccessModal";

function ParentProfile() {

    const [profile, setProfile] = useState(null);

    const user =
        JSON.parse(localStorage.getItem("user"));

    const [showPasswordModal, setShowPasswordModal] =
        useState(false);

    const [showSuccessModal, setShowSuccessModal] =
        useState(false);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response =
                    await getParentProfile(user.userId);


console.log("PARENT PROFILE DATA:", response.data);
console.log("PROFILE PHOTO:", response.data.profilePhoto);

                setProfile(response.data);

            }

            catch (error) {

                alert("Unable to load profile.");

            }

        };

        fetchProfile();

    }, []);

    if (!profile) {

        return <h2>Loading...</h2>;

    }

    const handleSave = async () => {

        try {

            await updateParentProfile(
                user.userId,
                profile
            );

            setShowSuccessModal(true);

            return true;

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to update profile."
            );

            return false;
        }
    };

    const handlePasswordChange = async (data) => {

        try {

            await changePassword(
                user.userId,
                {
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword
                }
            );

            alert("Password updated successfully.");

            setShowPasswordModal(false);

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to change password."
            );

        }

    };

    const handleHousePhotoChange = async (file) => {

        try {

            await updateParentHousePhoto(
                user.userId,
                file
            );

            const response =
                await getParentProfile(user.userId);

            setProfile(response.data);

            setShowSuccessModal(true);

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to update house photo."
            );

        }
    };


    const handleFamilyPhotoChange = async (file) => {

        try {

            await updateParentFamilyPhoto(
                user.userId,
                file
            );

            const response =
                await getParentProfile(user.userId);

            setProfile(response.data);

            setShowSuccessModal(true);

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to update family photo."
            );

        }
    };

    return (

        <ParentLayout>

            <div className="parent-profile-page">

                <ParentProfileHeader
                    profile={profile}
                />

                <PersonalInfoCard
                    profile={profile}
                    setProfile={setProfile}
                    onSave={handleSave}
                />

                <AddressCard
                    profile={profile}
                    setProfile={setProfile}
                    onSave={handleSave}
                />

                <ParentPhotosCard
                    profile={profile}
                    onHousePhotoChange={handleHousePhotoChange}
                    onFamilyPhotoChange={handleFamilyPhotoChange}
                />

                <DocumentsCard
                    profile={profile}
                />

                <AccountSettingsCard
                    profile={profile}
                    onChangePassword={() =>
                        setShowPasswordModal(true)
                    }
                />

                <ChangePasswordModal
                    isOpen={showPasswordModal}
                    onClose={() =>
                        setShowPasswordModal(false)
                    }
                    onSave={handlePasswordChange}
                />

                <SuccessModal
                    isOpen={showSuccessModal}
                    title="Profile Updated"
                    message="Your profile has been updated successfully."
                    onClose={() => setShowSuccessModal(false)}
                />

            </div>

        </ParentLayout>

    );
}

export default ParentProfile;