import "./ParentProfile.css";

function AccountSettingsCard({
    onChangePassword
}) {

    return (

        <section className="profile-card">

            <div className="card-header">

                <h2 className="card-title">
                    Account Settings
                </h2>

            </div>

            <p className="settings-description">
                Manage your account security and password.
            </p>

            <div className="settings-buttons">

                <button
                    className="secondary-button"
                    onClick={onChangePassword}
                >
                    Change Password
                </button>

            </div>

        </section>

    );
}

export default AccountSettingsCard;