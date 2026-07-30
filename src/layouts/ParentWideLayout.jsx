import ParentNavbar from "../components/parent/ParentNavbar";
import Footer from "../components/common/Footer";
import ChatAssistant from "../components/common/ChatAssistant";

import "./ParentWideLayout.css";

function ParentWideLayout({ children }) {

    return (

        <div className="parent-wide-layout">

            <ParentNavbar />

            <main className="parent-wide-layout-content">

                {children}

            </main>

            <Footer />

            <ChatAssistant
                onClick={() => alert("AI Assistant Coming Soon")}
            />

        </div>

    );

}

export default ParentWideLayout;