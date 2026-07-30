import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/parent/BookMeeting.css";

function MeetingForm() {

    const [formData, setFormData] = useState({

        meetingDate: "",

        meetingTime: "",

        remarks: ""

    });

    const navigate = useNavigate();

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.meetingDate || !formData.meetingTime) {

            alert("Please select meeting date and time.");

            return;

        }

        alert("Meeting request submitted successfully.");

        navigate("/scheduled-meetings");

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

                            <option>

                                10:00 AM

                            </option>

                            <option>

                                11:00 AM

                            </option>

                            <option>

                                12:00 PM

                            </option>

                            <option>

                                02:00 PM

                            </option>

                            <option>

                                03:00 PM

                            </option>

                            <option>

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

        </section>

    );

}

export default MeetingForm;