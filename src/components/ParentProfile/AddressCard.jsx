import "./ParentProfile.css";

function AddressCard() {

    return (

        <section className="profile-card">

            <h2 className="card-title">
                Address Information
            </h2>

            <div className="profile-grid">

                <div className="profile-field profile-field-full">

                    <label>Residential Address</label>

                    <textarea
                        rows="4"
                        value="Flat No. 201, Shree Residency, Near MIT College, Kothrud, Pune"
                        readOnly
                    />

                </div>

                <div className="profile-field">

                    <label>City</label>

                    <input
                        type="text"
                        value="Pune"
                        readOnly
                    />

                </div>

                <div className="profile-field">

                    <label>State</label>

                    <input
                        type="text"
                        value="Maharashtra"
                        readOnly
                    />

                </div>

                <div className="profile-field">

                    <label>Pincode</label>

                    <input
                        type="text"
                        value="411038"
                        readOnly
                    />

                </div>

                <div className="profile-field">

                    <label>Country</label>

                    <input
                        type="text"
                        value="India"
                        readOnly
                    />

                </div>

            </div>

        </section>

    );

}

export default AddressCard;