import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080"
});

export const askAI = async (question) => {

    const token = localStorage.getItem("token");

    const response = await API.post(
        "/api/chat",
        {
            question
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data.answer;
};