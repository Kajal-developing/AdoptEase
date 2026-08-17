import { useState } from "react";
import { X } from "lucide-react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import "./ChatModal.css";
import { askAI } from "../../api/chatApi";

function ChatModal({ open, onClose }) {

    const [messages, setMessages] = useState([

        {

            sender: "bot",

            text:
                "👋 Hello! I am AdoptEase AI. Ask me anything about adoption."

        }

    ]);

    if (!open) {

        return null;

    }

    const sendMessage = async (question) => {

        setMessages((prev) => [

            ...prev,

            {

                sender: "user",

                text: question

            }

        ]);

        setMessages((prev) => [

            ...prev,

            {

                sender: "bot",

                text: "Thinking..."

            }

        ]);

        try {

            const answer = await askAI(question);

            setMessages((prev) => [

                ...prev.slice(0, -1),

                {

                    sender: "bot",

                    text: answer

                }

            ]);

        }

        catch (error) {

            console.error("AI Chat Error:", error);

            console.error(
                "Response:",
                error.response?.data
            );

            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    sender: "bot",
                    text:
                        error.response?.data?.message ||
                        "Sorry! AI is unavailable."
                }
            ]);

        }

    };

    return (

        <div className="chat-overlay">

            <div className="chat-modal">

                <div className="chat-header">

                    <div>

                        <h3>

                            🤖 AdoptEase AI

                        </h3>

                        <small>

                            Adoption Assistant

                        </small>

                    </div>

                    <button

                        className="close-chat"

                        onClick={onClose}

                    >

                        <X size={20} />

                    </button>

                </div>

                <div className="chat-body">

                    {

                        messages.map((msg, index) => (

                            <ChatMessage

                                key={index}

                                sender={msg.sender}

                                message={msg.text}

                            />

                        ))

                    }

                </div>

                <ChatInput

                    onSend={sendMessage}

                />

            </div>

        </div>

    );

}

export default ChatModal;