import "../../pages/center/CenterProfile.css";

function CenterInfoCard() {

    return (

        <section className="profile-card">

            <div className="card-header">

                <h2>Center Information</h2>

                <button className="edit-btn">

                    Edit

                </button>

            </div>

            <div className="info-grid">

                <div className="info-item">

                    <label>Center Name</label>

                    <input
                        type="text"
                        defaultValue="Helping Hands Adoption Center"
                    />

                </div>

                <div className="info-item">

                    <label>Email</label>

                    <input
                        type="email"
                        defaultValue="helpinghands@gmail.com"
                    />

                </div>

                <div className="info-item">

                    <label>Phone</label>

                    <input
                        type="text"
                        defaultValue="+91 9876543210"
                    />

                </div>

                <div className="info-item">

                    <label>Website</label>

                    <input
                        type="text"
                        defaultValue="www.helpinghands.org"
                    />

                </div>

                <div className="info-item full-width">

                    <label>Description</label>

                    <textarea
                        rows="5"
                        defaultValue="Helping Hands Adoption Center is a CARA-recognized organization committed to providing safe, legal, and transparent adoption services while ensuring the welfare of every child."
                    />

                </div>

            </div>

        </section>

    );

}

export default CenterInfoCard;