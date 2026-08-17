import ParentNavbar from "../components/parent/ParentNavbar";
import Footer from "../components/common/Footer";
import ChatAssistant from "../components/common/ChatAssistant";
import { useState } from "react";
import ChatModal from "../components/chat";

import "./ParentWideLayout.css";

function ParentWideLayout({ children }) {

    const [chatOpen, setChatOpen] = useState(false);

    return (

        <div className="parent-wide-layout">

            <ParentNavbar />

            <main className="parent-wide-layout-content">

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

export default ParentWideLayout;