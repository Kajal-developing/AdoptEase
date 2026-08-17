import "./AdminHome.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import DashboardCard from "../../components/admin/DashboardCard";
import DashboardActionCard from "../../components/admin/DashboardActionCard";

import { getAdminDashboard } from "../../api/authApi";


function AdminHome() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const response = await getAdminDashboard();

                setDashboard(response.data);

            } catch (error) {

                console.error(
                    "Unable to load admin dashboard:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load dashboard."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);


    if (loading) {

        return (

            <AdminLayout>

                <div
                    style={{
                        minHeight: "70vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "20px"
                    }}
                >

                    Loading dashboard...

                </div>

            </AdminLayout>

        );

    }


    if (error) {

        return (

            <AdminLayout>

                <div
                    style={{
                        minHeight: "70vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#D85A30",
                        fontSize: "20px",
                        fontWeight: "600"
                    }}
                >

                    {error}

                </div>

            </AdminLayout>

        );

    }


    return (

        <AdminLayout>

            <div className="admin-home">

                <h1>
                    Welcome Admin !!
                </h1>

                <p className="admin-subtitle">
                    Here's what needs your attention today.
                </p>


                {/* ================= STATISTICS ================= */}

                <div className="dashboard-cards">

                    <DashboardCard
                        title="Total Parents"
                        value={dashboard.totalParents}
                        background="#E8F6D9"
                    />


                    <DashboardCard
                        title="Pending Requests"
                        value={dashboard.pendingCenters}
                        background="#E8E2FA"
                    />


                    <DashboardCard
                        title="Approved Centers"
                        value={dashboard.approvedCenters}
                        background="#FFE9AE"
                    />


                    <DashboardCard
                        title="Total Meetings"
                        value={dashboard.totalMeetings}
                        background="#CFEFFF"
                    />

                </div>


                {/* ================= QUICK ACTIONS ================= */}

                <div className="dashboard-actions">

                    <DashboardActionCard
                        title="Pending Parents Requests"
                        onClick={() =>
                            navigate("/admin/parent-requests")
                        }
                    />


                    <DashboardActionCard
                        title="Pending Centers Requests"
                        onClick={() =>
                            navigate("/admin/center-requests")
                        }
                    />

                </div>


                {/* ================= ADDITIONAL STATISTICS ================= */}

                <div className="dashboard-cards">

                    <DashboardCard
                        title="Total Centers"
                        value={dashboard.totalCenters}
                        background="#FCEEE8"
                    />


                    <DashboardCard
                        title="Total Children"
                        value={dashboard.totalChildren}
                        background="#E8F6D9"
                    />


                    <DashboardCard
                        title="Available Children"
                        value={dashboard.availableChildren}
                        background="#FFE9AE"
                    />


                    <DashboardCard
                        title="Pending Meetings"
                        value={dashboard.pendingMeetings}
                        background="#CFEFFF"
                    />

                </div>


                {/* ================= TICKETS ================= */}

                <div className="dashboard-cards">

                    <DashboardCard
                        title="Total Tickets"
                        value={dashboard.totalTickets}
                        background="#E8E2FA"
                    />


                    <DashboardCard
                        title="Open Tickets"
                        value={dashboard.openTickets}
                        background="#FCEEE8"
                    />

                </div>


                
            </div>

        </AdminLayout>

    );

}


export default AdminHome;