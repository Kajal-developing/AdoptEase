import { CheckCircle } from "lucide-react";

import "../../pages/parent/BookMeeting.css";

function MeetingGuidelines() {

    return (

        <section className="meeting-guidelines-section">

            <div className="meeting-guidelines">

                <h2>

                    Meeting Guidelines

                </h2>

                <div className="guideline-item">

                    <CheckCircle
                        size={20}
                        className="guideline-icon"
                    />

                    <span>

                        Reach the adoption center at least 15 minutes before your scheduled meeting.

                    </span>

                </div>

                <div className="guideline-item">

                    <CheckCircle
                        size={20}
                        className="guideline-icon"
                    />

                    <span>

                        Carry a valid government-issued identity proof during your visit.

                    </span>

                </div>

                <div className="guideline-item">

                    <CheckCircle
                        size={20}
                        className="guideline-icon"
                    />

                    <span>

                        Bring all required documents mentioned during the registration process.

                    </span>

                </div>

                <div className="guideline-item">

                    <CheckCircle
                        size={20}
                        className="guideline-icon"
                    />

                    <span>

                        Be respectful to the adoption center staff and follow their instructions.

                    </span>

                </div>

                <div className="guideline-item">

                    <CheckCircle
                        size={20}
                        className="guideline-icon"
                    />

                    <span>

                        If you are unable to attend, update your meeting request before it is confirmed.

                    </span>

                </div>

            </div>

        </section>

    );

}

export default MeetingGuidelines;