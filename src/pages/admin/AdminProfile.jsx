import "./AdminProfile.css";

import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
    HeroSection,
    ProfileCard,
    PersonalInfo,
    AccountInfo,
    Permissions
} from "../../components/AdminProfile";

import { getAdminProfile } from "../../api/authApi";

function AdminProfile() {

    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    useEffect(() => {

        const fetchAdminProfile = async () => {

            try {

                const response =
                    await getAdminProfile(user.userId);

                setAdmin(response.data);

            } catch (error) {

                console.error(
                    "Unable to load admin profile:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        if (user.userId) {
            fetchAdminProfile();
        }

    }, []);

    if (loading) {

        return (
            <AdminLayout>

                <div
                    style={{
                        textAlign: "center",
                        padding: "150px 20px",
                        fontSize: "20px"
                    }}
                >
                    Loading profile...
                </div>

            </AdminLayout>
        );
    }

    if (!admin) {

        return (
            <AdminLayout>

                <div
                    style={{
                        textAlign: "center",
                        padding: "150px 20px",
                        color: "red"
                    }}
                >
                    Unable to load admin profile.
                </div>

            </AdminLayout>
        );
    }

    return (

        <AdminLayout>

            <div className="admin-profile-page">

                <HeroSection />

                <ProfileCard admin={admin} />

                <PersonalInfo admin={admin} />

                <AccountInfo admin={admin} />

                <Permissions />

            </div>

        </AdminLayout>
    );
}

export default AdminProfile;