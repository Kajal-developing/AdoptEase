import "./DashboardCard.css";

function DashboardCard({ title, value, background }) {

    return (

        <div
            className="dashboard-card"
            style={{ background }}
        >

            <h4>{title}</h4>

            <hr />

            <h2>{value}</h2>

        </div>

    );

}

export default DashboardCard;