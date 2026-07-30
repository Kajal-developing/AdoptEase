import "./ParentProfile.css";

import PrimaryButton from "../common/PrimaryButton";

function AccountSettingsCard() {

    return (

        <section className="profile-card">

            <h2 className="card-title">
                Account Settings
            </h2>

            <p className="settings-description">
                You can update your profile information or change your password.
                Changes will be saved after backend integration.
            </p>

            <div className="settings-buttons">

                <button className="secondary-button">
                    Edit Profile
                </button>

                <button className="secondary-button">
                    Change Password
                </button>

                <div className="save-button-wrapper">

                    <PrimaryButton
                        onClick={() => { }}
                    >
                        Save Changes
                    </PrimaryButton>

                </div>

            </div>

        </section>

    );

}

export default AccountSettingsCard;