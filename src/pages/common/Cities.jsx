import "./Cities.css";

import ParentLayout from "../../layouts/ParentLayout";
import CitiesGrid from "../../components/Cities/CitiesGrid";

function Cities() {

    return (

        <ParentLayout>

            <div className="cities-page">

                <CitiesGrid />

            </div>

        </ParentLayout>

    );

}

export default Cities;