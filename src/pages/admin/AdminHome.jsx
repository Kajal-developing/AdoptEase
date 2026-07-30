import "./AdminHome.css";

import AdminLayout from "../../layouts/AdminLayout";

import DashboardCard from "../../components/admin/DashboardCard";
import DashboardActionCard from "../../components/admin/DashboardActionCard";

function AdminHome() {

    const meetings = [

        {
            parent: "Mrs. Aishwarya Patil",
            child: "Heer",
            status: "CONFIRMED"
        },

        {
            parent: "Mr. Shantanu Kulkarni",
            child: "Rahi",
            status: "PENDING"
        },

        {
            parent: "Mrs. Aishwarya Patil",
            child: "Bob",
            status: "CONFIRMED"
        }

    ];

    return (

        <AdminLayout>

            <div className="admin-home">

                <h1>
                    Welcome Admin !!
                </h1>

                <p className="admin-subtitle">
                    Here's what needs your attention today.
                </p>

                {/* Statistics */}

                <div className="dashboard-cards">

                    <DashboardCard
                        title="Total Parents"
                        value="80"
                        background="#E8F6D9"
                    />

                    <DashboardCard
                        title="Pending Requests"
                        value="7"
                        background="#E8E2FA"
                    />

                    <DashboardCard
                        title="Approved Centers"
                        value="24"
                        background="#FFE9AE"
                    />

                    <DashboardCard
                        title="Total Meetings"
                        value="42"
                        background="#CFEFFF"
                    />

                </div>

                {/* Quick Actions */}

                <div className="dashboard-actions">

                    <DashboardActionCard
                        title="Pending Parents Requests"
                        onClick={() => alert("Pending Parents")}
                    />

                    <DashboardActionCard
                        title="Pending Centers Requests"
                        onClick={() => alert("Pending Centers")}
                    />

                </div>

                {/* Recent Meetings */}

                <div className="recent-meetings">

                    <h3>
                        Recent Meetings
                    </h3>

                    <table>

                        <tbody>

                            {meetings.map((meeting, index) => (

                                <tr key={index}>

                                    <td>

                                        <strong>Parent :</strong>

                                        {meeting.parent}

                                    </td>

                                    <td>

                                        <strong>Child :</strong>

                                        {meeting.child}

                                    </td>

                                    <td>

                                        <strong>Status :</strong>

                                        {meeting.status}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}

export default AdminHome;