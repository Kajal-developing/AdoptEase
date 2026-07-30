import { useNavigate } from "react-router-dom";

import "../../pages/center/AllChildren.css";

function AddChildCard() {

    const navigate = useNavigate();

    return (

        <div
            className="add-child-card"
            onClick={() => navigate("/center/add-child")}
        >

            <div className="add-child-icon">

                +

            </div>

            <p>

                Add New Child For Adoption

            </p>

        </div>

    );

}

export default AddChildCard;