import "./ParentProfile.css";

function PersonalInfoCard() {

    return (

        <section className="profile-card">

            <h2 className="card-title">
                Personal Information
            </h2>

            <div className="profile-grid">

                <div className="profile-field">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value="Kajal Nimbekar"
                        readOnly
                    />
                </div>

                <div className="profile-field">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value="kajal@gmail.com"
                        readOnly
                    />
                </div>

                <div className="profile-field">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value="+91 9876543210"
                        readOnly
                    />
                </div>

                <div className="profile-field">
                    <label>Date of Birth</label>
                    <input
                        type="text"
                        value="09 July 1998"
                        readOnly
                    />
                </div>

                <div className="profile-field">
                    <label>Gender</label>
                    <input
                        type="text"
                        value="Female"
                        readOnly
                    />
                </div>

                <div className="profile-field">
                    <label>Occupation</label>
                    <input
                        type="text"
                        value="Software Engineer"
                        readOnly
                    />
                </div>

            </div>

        </section>

    );

}

export default PersonalInfoCard;