import CenterWideLayout from "../../layouts/CenterWideLayout";
import ChildHero from "../../components/ChildHero/ChildHero";
import ChildrenGrid from "../../components/AllChildren/ChildrenGrid";

import "./AllChildren.css";

function AllChildren() {

    return (

        <CenterWideLayout>

            <ChildHero
                title="All Children"
            />

            <div className="all-children-page">

                <ChildrenGrid />

            </div>

        </CenterWideLayout>

    );

}

export default AllChildren;