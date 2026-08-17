import "./../../pages/admin/AdminProfile.css";

import adminImage from "../../assets/admin/admin-profile.jpg";

import {
    ShieldCheck,
    Mail,
    Phone,
    MapPin
} from "lucide-react";

import LogoutButton from "../../components/common/LogoutButton";

function ProfileCard({ admin }) {

    return (

        <section className="admin-profile-card-section">

            <div className="admin-profile-card">

                <div className="admin-profile-left">

                    <img
                        src={adminImage}
                        alt="Admin"
                        className="admin-profile-image"
                    />

                </div>

                <div className="admin-profile-right">

                    <span className="admin-role">
                        System Administrator
                    </span>

                    <h2>
                        {admin.userName}
                    </h2>

                    <p className="admin-description">

                        Responsible for managing the AdoptEase platform,
                        approving adoption centers and parents, monitoring
                        child records and ensuring secure platform operations.

                    </p>

                    <div className="admin-info-grid">

                        <div className="admin-info-item">

                            <Mail size={18} />

                            <span>
                                {admin.email}
                            </span>

                        </div>

                        <div className="admin-info-item">

                            <Phone size={18} />

                            <span>
                                {admin.contactNo}
                            </span>

                        </div>

                        <div className="admin-info-item">

                            <MapPin size={18} />

                            <span>
                                {admin.city}
                            </span>

                        </div>

                        <div className="admin-info-item">

                            <ShieldCheck size={18} />

                            <span>
                                Active Administrator
                            </span>

                        </div>

                    </div>

                </div>

                {/* Logout Button */}
                <div className="admin-profile-logout">
                    <LogoutButton />
                </div>

            </div>

        </section>
    );
}

export default ProfileCard;