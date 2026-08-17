import { useState } from "react";
import { bookMeeting } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import "../../pages/parent/BookMeeting.css";
import SuccessModal from "../../components/common/SuccessModal";

function MeetingForm({ child }) {

    const [formData, setFormData] = useState({

        meetingDate: "",

        meetingTime: "",

        remarks: ""

    });

    const navigate = useNavigate();

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    console.log("User Object:", user);
    console.log("User Id:", user.userId);
    console.log("Child:", child);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleSubmit = async (e) => {

        console.log("Submit Clicked");

        e.preventDefault();

        if (!formData.meetingDate || !formData.meetingTime) {

            alert("Please select meeting date and time.");

            return;

        }

        try {
            const request = {
                childId: child.childId,
                meetingDate: formData.meetingDate,
                meetingTime: formData.meetingTime,
                remarks: formData.remarks
            };

            console.log("Request:", request);

            await bookMeeting(
                user.userId,
                request
            );

            setShowSuccessModal(true);

        }

        catch (error) {

            console.log(error);

            console.log(error.response);

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Unable to book meeting."
            );
        }

    };
    
    return (

        <section className="meeting-form-section">

            <form
                className="meeting-form"
                onSubmit={handleSubmit}
            >

                <h2>

                    Schedule Meeting

                </h2>

                <div className="meeting-form-grid">

                    <div className="form-group">

                        <label>

                            Meeting Date

                        </label>

                        <input

                            type="date"

                            name="meetingDate"

                            value={formData.meetingDate}

                            onChange={handleChange}

                            min={new Date().toISOString().split("T")[0]}

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Meeting Time

                        </label>

                        <select

                            name="meetingTime"

                            value={formData.meetingTime}

                            onChange={handleChange}

                        >

                            <option value="">
                                Select Time
                            </option>

                            <option value="10:00">
                                10:00 AM
                            </option>

                            <option value="11:00">
                                11:00 AM
                            </option>

                            <option value="12:00">
                                12:00 PM
                            </option>

                            <option value="14:00">
                                02:00 PM
                            </option>

                            <option value="15:00">
                                03:00 PM
                            </option>

                            <option value="16:00">
                                04:00 PM
                            </option>

                        </select>

                    </div>

                </div>

                <div className="form-group">

                    <label>

                        Remarks (Optional)

                    </label>

                    <textarea

                        rows="5"

                        name="remarks"

                        placeholder="Write your remarks here..."

                        value={formData.remarks}

                        onChange={handleChange}

                    />

                </div>

                <button
                    type="submit"
                    className="schedule-btn"
                >

                    Schedule Meeting

                </button>

            </form>

            <SuccessModal
                isOpen={showSuccessModal}
                title="Meeting Scheduled"
                message="Your meeting has been booked successfully."
                onClose={() => {
                    setShowSuccessModal(false);
                    navigate("/scheduled-meetings");
                }}
            />
        </section>

    );

}

export default MeetingForm;