import "./BookMeeting.css";

import ParentWideLayout from "../../layouts/ParentWideLayout";

import {
    HeroSection,
    BookingNotice,
    ChildSummaryCard,
    MeetingForm,
    MeetingGuidelines
} from "../../components/BookMeeting";

function BookMeeting() {

    return (

        <ParentWideLayout>

            <div className="book-meeting-page">

                <HeroSection />

                <BookingNotice />

                <ChildSummaryCard />

                <MeetingForm />

                <MeetingGuidelines />

            </div>

        </ParentWideLayout>

    );

}

export default BookMeeting;