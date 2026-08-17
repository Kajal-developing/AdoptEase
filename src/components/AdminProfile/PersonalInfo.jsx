import "./../../pages/admin/AdminProfile.css";

import {
    User,
    Mail,
    Phone,
    MapPin
} from "lucide-react";

function PersonalInfo({ admin }) {

    return (

        <section className="profile-details-section">

            <div className="details-card">

                <h2>
                    Personal Information
                </h2>

                <div className="details-grid">

                    <div className="detail-item">

                        <User size={18} />

                        <div>

                            <label>Full Name</label>

                            <p>
                                {admin.userName}
                            </p>

                        </div>

                    </div>

                    <div className="detail-item">

                        <Mail size={18} />

                        <div>

                            <label>Email</label>

                            <p>
                                {admin.email}
                            </p>

                        </div>

                    </div>

                    <div className="detail-item">

                        <Phone size={18} />

                        <div>

                            <label>Phone Number</label>

                            <p>
                                {admin.contactNo}
                            </p>

                        </div>

                    </div>

                    <div className="detail-item">

                        <MapPin size={18} />

                        <div>

                            <label>Location</label>

                            <p>
                                {admin.city}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default PersonalInfo;