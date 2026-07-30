import "../../pages/center/CenterProfile.css";

function AccountSettingsCard() {

    return (

        <section className="profile-card">

            <div className="card-header">

                <h2>Account Settings</h2>

            </div>

            <div className="info-grid">

                <div className="info-item">

                    <label>Current Password</label>

                    <input
                        type="password"
                        placeholder="Enter current password"
                    />

                </div>

                <div className="info-item">

                    <label>New Password</label>

                    <input
                        type="password"
                        placeholder="Enter new password"
                    />

                </div>

                <div className="info-item">

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        placeholder="Confirm new password"
                    />

                </div>

            </div>

            <div className="account-buttons">

                <button className="save-btn">

                    Save Changes

                </button>

                <button className="deactivate-btn">

                    Deactivate Account

                </button>

            </div>

        </section>

    );

}

export default AccountSettingsCard;