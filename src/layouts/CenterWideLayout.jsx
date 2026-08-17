import CenterNavbar from "../components/center/CenterNavbar/CenterNavbar";
import Footer from "../components/common/Footer";
import ChatAssistant from "../components/common/ChatAssistant";
import "./CenterWideLayout.css";
import { useState } from "react";
import ChatModal from "../components/chat";

function CenterWideLayout({ children }) {

    const [chatOpen, setChatOpen] = useState(false);

    return (

        <div className="center-wide-layout">

            <CenterNavbar />

            <main className="center-wide-layout-content">

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

export default CenterWideLayout;