import "./DashboardActionCard.css";
import { MoveRight } from "lucide-react";

function DashboardActionCard({ title, onClick }) {

    return (

        <div
            className="dashboard-action-card"
            onClick={onClick}
        >

            <span>{title}</span>

            <MoveRight
                size={42}
                strokeWidth={1.7}
            />

        </div>

    );

}

export default DashboardActionCard;