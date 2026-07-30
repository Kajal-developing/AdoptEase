import "./ChatAssistant.css";
import { FaRobot } from "react-icons/fa";

function ChatAssistant({ onClick }) {

    return (

        <button
            className="chat-assistant"
            onClick={onClick}
            aria-label="Open AI Assistant"
        >
            <FaRobot />

            <span>AI Assistant</span>

        </button>

    );

}

export default ChatAssistant;