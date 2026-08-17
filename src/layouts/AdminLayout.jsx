import AdminNavbar from "../components/admin/AdminNavbar/AdminNavbar";
import Footer from "../components/common/Footer";
import ChatAssistant from "../components/common/ChatAssistant";
import "./AdminLayout.css";
import { useState } from "react";
import ChatModal from "../components/chat";

function AdminLayout({ children }) {

    const [chatOpen, setChatOpen] = useState(false);

    return (

        <div className="admin-layout">

            <AdminNavbar />

            <main className="admin-layout-content">

                {children}

            </main>

            <Footer />

            <ChatAssistant
                onClick={() => setChatOpen(true)}
            />

            <ChatModal
                open={chatOpen}
                onClose={() => setChatOpen(false)}
            />

        </div>

    );

}

export default AdminLayout;