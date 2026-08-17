import CenterNavbar from "../components/center/CenterNavbar/CenterNavbar";
import Footer from "../components/common/Footer";
import ChatAssistant from "../components/common/ChatAssistant";
import "./CenterLayout.css";
import { useState } from "react";
import ChatModal from "../components/chat";

function CenterLayout({ children }) {

    const [chatOpen, setChatOpen] = useState(false);

    return (

        <div className="center-layout">

            <CenterNavbar />

            <main className="center-layout-content">
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

export default CenterLayout;