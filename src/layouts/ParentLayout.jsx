import ParentNavbar from "../components/parent/ParentNavbar";
import Footer from "../components/common/Footer";
import ChatAssistant from "../components/common/ChatAssistant";
import "./ParentLayout.css";
import { useState } from "react";
import ChatModal from "../components/chat";

function ParentLayout({ children }) {

    const [chatOpen, setChatOpen] = useState(false);

    return (

        <div className="parent-layout">

            <ParentNavbar />

            <main className="parent-layout-content">
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

export default ParentLayout;