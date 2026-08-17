import { useEffect, useState } from "react";

import MeetingRequestCard from "./MeetingRequestCard";

import { getCenterMeetingRequests } from "../../api/authApi";

import "../../pages/center/MeetingRequests.css";

function MeetingRequestGrid() {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const loadMeetingRequests = async () => {

            try {

                const user = JSON.parse(
                    localStorage.getItem("user")
                );

                if (!user?.userId) {

                    setError("User information not found.");

                    return;

                }


                const response =
                    await getCenterMeetingRequests(
                        user.userId
                    );


                console.log(
                    "Meeting Requests:",
                    response.data
                );


                setRequests(response.data);

            }
            catch (error) {

                console.error(
                    "Get Meeting Requests Error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to load meeting requests."
                );

            }
            finally {

                setLoading(false);

            }

        };


        loadMeetingRequests();

    }, []);


    const handleClearTicket = (meetingId) => {

        setRequests(prevRequests =>
            prevRequests.filter(
                request =>
                    request.meetingId !== meetingId
            )
        );

    };


    if (loading) {

        return (

            <div className="meeting-loading">

                Loading meeting requests...

            </div>

        );

    }


    if (error) {

        return (

            <div className="meeting-error">

                {error}

            </div>

        );

    }


    if (requests.length === 0) {

        return (

            <div className="no-meeting-requests">

                No pending meeting requests.

            </div>

        );

    }


    return (

        <section className="request-grid-section">

            <div className="request-grid">

                {requests.map((request) => (

                    <MeetingRequestCard

                        key={request.meetingId}

                        request={request}

                        onClear={handleClearTicket}

                    />

                ))}

            </div>

        </section>

    );

}

export default MeetingRequestGrid;