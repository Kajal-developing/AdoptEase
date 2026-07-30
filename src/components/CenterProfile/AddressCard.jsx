import "../../pages/center/CenterProfile.css";

function AddressCard() {

    return (

        <section className="profile-card">

            <div className="card-header">

                <h2>Address Information</h2>

                <button className="edit-btn">

                    Edit

                </button>

            </div>

            <div className="info-grid">

                <div className="info-item">

                    <label>Address Line 1</label>

                    <input
                        type="text"
                        defaultValue="123, MG Road"
                    />

                </div>

                <div className="info-item">

                    <label>Address Line 2</label>

                    <input
                        type="text"
                        defaultValue="Near Railway Station"
                    />

                </div>

                <div className="info-item">

                    <label>City</label>

                    <input
                        type="text"
                        defaultValue="Pune"
                    />

                </div>

                <div className="info-item">

                    <label>State</label>

                    <input
                        type="text"
                        defaultValue="Maharashtra"
                    />

                </div>

                <div className="info-item">

                    <label>Pincode</label>

                    <input
                        type="text"
                        defaultValue="411001"
                    />

                </div>

                <div className="info-item">

                    <label>Country</label>

                    <input
                        type="text"
                        defaultValue="India"
                    />

                </div>

            </div>

        </section>

    );

}

export default AddressCard;