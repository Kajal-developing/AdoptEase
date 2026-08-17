import "./ScheduledMeetings.css";
import { useEffect, useState } from "react";
import ParentWideLayout from "../../layouts/ParentWideLayout";
import { getScheduledMeetings } from "../../api/authApi";
import { MeetingsGrid } from "../../components/ScheduledMeetings";

function ScheduledMeetings() {

    const [meetings, setMeetings] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        const fetchMeetings = async () => {

            try {

                const response =
                    await getScheduledMeetings(
                        user.userId
                    );

                setMeetings(response.data);

            }
            catch (error) {

                console.error(
                    "Unable to load meetings:",
                    error
                );

            }

        };

        fetchMeetings();

    }, [user.userId]);


    // Remove cancelled ticket from screen
    const handleMeetingCancelled = (meetingId) => {

        setMeetings((prevMeetings) =>

            prevMeetings.filter(
                (meeting) =>
                    meeting.meetingId !== meetingId
            )

        );

    };

    const handleMeetingRescheduled = (
        meetingId,
        updatedMeeting
    ) => {

        setMeetings((prevMeetings) =>
            prevMeetings.map((meeting) =>
                meeting.meetingId === meetingId
                    ? updatedMeeting
                    : meeting
            )
        );

    };

    return (

        <ParentWideLayout>

            <div className="scheduled-page">

                <div className="scheduled-header">

                    <h1>
                        Scheduled Meeting
                    </h1>

                </div>

                <div className="approved-meeting-note">
                    <span className="note-icon">!</span>

                    <span>
                        <strong>Approved meetings cannot be cancelled.</strong>
                        <br />
                        If you need to cancel an approved meeting, please contact the respective adoption center.
                    </span>
                </div>

                <MeetingsGrid
                    meetings={meetings}
                    onMeetingCancelled={
                        handleMeetingCancelled
                    }
                    onMeetingRescheduled={
                        handleMeetingRescheduled
                    }
                />

            </div>

        </ParentWideLayout>

    );

}

export default ScheduledMeetings;