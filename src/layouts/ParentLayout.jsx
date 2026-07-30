import ParentNavbar from "../components/parent/ParentNavbar";
import Footer from "../components/common/Footer";
import ChatAssistant from "../components/common/ChatAssistant";
import "./ParentLayout.css";

function ParentLayout({ children }) {

    return (

        <div className="parent-layout">

            <ParentNavbar />

            <main className="parent-layout-content">
                {children}
            </main>

            <Footer />

            <ChatAssistant
                onClick={() => alert("AI Assistant Coming Soon")}
            />

        </div>

    );

}

export default ParentLayout;