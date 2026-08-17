import "./ChatModal.css";

function ChatMessage({ message, sender }) {

    return (

        <div
            className={
                sender === "user"
                    ? "user-message"
                    : "bot-message"
            }
        >

            {message}

        </div>

    );

}

export default ChatMessage;