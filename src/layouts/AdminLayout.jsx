import AdminNavbar from "../components/admin/AdminNavbar/AdminNavbar";
import Footer from "../components/common/Footer";
import ChatAssistant from "../components/common/ChatAssistant";
import "./AdminLayout.css";

function AdminLayout({ children }) {

    return (

        <div className="admin-layout">

            <AdminNavbar />

            <main className="admin-layout-content">

                {children}

            </main>

            <Footer />

            <ChatAssistant
                onClick={() => alert("AI Assistant Coming Soon")}
            />

        </div>

    );

}

export default AdminLayout;