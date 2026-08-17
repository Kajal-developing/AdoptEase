import "./../../pages/admin/AdminProfile.css";
import { useNavigate } from "react-router-dom";

import {
    Users,
    Building2,
    Baby,
    CalendarCheck,
    Bell,
    ShieldCheck
} from "lucide-react";

function Permissions() {

    const navigate = useNavigate();

    const permissions = [

        {
            icon: <Users size={30} />,
            title: "Parent Management"
        },

        {
            icon: <Building2 size={30} />,
            title: "Center Management"
        },

        {
            icon: <Baby size={30} />,
            title: "Child Management"
        },

        {
            icon: <CalendarCheck size={30} />,
            title: "Meeting Management"
        },

        {
            icon: <Bell size={30} />,
            title: "Notifications"
        },

        {
            icon: <ShieldCheck size={30} />,
            title: "System Administration"
        }

    ];

    return (

        <section className="permissions-section">

            <div className="details-card">

                <h2>

                    System Permissions

                </h2>

                <div className="permissions-grid">

                    {

                        permissions.map((permission, index) => (

                            <div
                                key={index}
                                className="permission-card"
                            >

                                <div className="permission-icon">

                                    {permission.icon}

                                </div>

                                <h3>

                                    {permission.title}

                                </h3>

                            </div>

                        ))

                    }

                </div>

                <div className="profile-button-container">

                    <button
                        className="edit-profile-btn"
                        onClick={() => navigate("/admin/edit-profile")}
                    >

                        Edit Profile

                    </button>

                </div>

            </div>

        </section>

    );

}

export default Permissions;