import "./BookMeeting.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChildById } from "../../api/authApi";
import ParentWideLayout from "../../layouts/ParentWideLayout";

import {
    HeroSection,
    BookingNotice,
    ChildSummaryCard,
    MeetingForm,
    MeetingGuidelines
} from "../../components/BookMeeting";

function BookMeeting() {

    const { city, centerId, childId } = useParams();

    const [child, setChild] = useState(null);

    useEffect(() => {

        const fetchChild = async () => {

            try {

                const response = await getChildById(childId);

                setChild(response.data);

                console.log(response.data);
            }

            catch (error) {

                alert("Unable to load child.");

            }

        };

        fetchChild();

    }, [childId]);

    if (!child) {

        return <h2>Loading...</h2>;

    }

    return (

        <ParentWideLayout>

            <div className="book-meeting-page">

                <HeroSection />

                <BookingNotice />

                <ChildSummaryCard child={child} />

                <MeetingForm child={child} />

                <MeetingGuidelines />

            </div>

        </ParentWideLayout>

    );

}

export default BookMeeting;