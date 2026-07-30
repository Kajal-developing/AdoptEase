import { AlertTriangle } from "lucide-react";

import "../../pages/parent/BookMeeting.css";

function BookingNotice() {

    return (

        <section className="booking-notice-section">

            <div className="booking-notice">

                <div className="notice-title">

                    <AlertTriangle
                        size={18}
                        className="notice-icon"
                    />

                    <span>

                        Please Read Before Booking :

                    </span>

                </div>

                <ul className="notice-list">

                    <li>
                        You can cancel or update the meeting date and time only before the adoption center confirms your request.
                    </li>

                    <li>
                        Once the center confirms your meeting, cancellation is not allowed through the application.
                    </li>

                    <li>
                        If the center rejects your request, you can schedule another meeting.
                    </li>

                    <li>
                        Meeting confirmation generally takes 24–48 hours.
                    </li>

                    <li>
                        After approval, the adoption center's contact details will be visible in your scheduled meetings.
                    </li>

                </ul>

            </div>

        </section>

    );

}

export default BookingNotice;