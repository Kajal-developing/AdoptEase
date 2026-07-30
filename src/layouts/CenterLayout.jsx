import CenterNavbar from "../components/center/CenterNavbar/CenterNavbar";
import Footer from "../components/common/Footer";
import ChatAssistant from "../components/common/ChatAssistant";
import "./CenterLayout.css";

function CenterLayout({ children }) {

    return (

        <div className="center-layout">

            <CenterNavbar />

            <main className="center-layout-content">
                {children}
            </main>

            <Footer />

            <ChatAssistant
                onClick={() => alert("AI Assistant Coming Soon")}
            />

        </div>

    );

}

export default CenterLayout;