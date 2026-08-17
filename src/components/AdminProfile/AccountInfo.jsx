import "./../../pages/admin/AdminProfile.css";

import {
    ShieldCheck,
    CalendarDays,
    Clock,
    BadgeCheck
} from "lucide-react";

function AccountInfo({ admin }) {

    return (

        <section className="profile-details-section">

            <div className="details-card">

                <h2>
                    Account Information
                </h2>

                <div className="details-grid">

                    <div className="detail-item">

                        <ShieldCheck size={18} />

                        <div>

                            <label>Role</label>

                            <p>
                                System Administrator
                            </p>

                        </div>

                    </div>

                    <div className="detail-item">

                        <BadgeCheck size={18} />

                        <div>

                            <label>Status</label>

                            <p>
                                {admin.approvalStatus}
                            </p>

                        </div>

                    </div>

                    <div className="detail-item">

                        <CalendarDays size={18} />

                        <div>

                            <label>Member Since</label>

                            <p>
                                January 2026
                            </p>

                        </div>

                    </div>

                    <div className="detail-item">

                        <Clock size={18} />

                        <div>

                            <label>Account</label>

                            <p>
                                Active
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AccountInfo;