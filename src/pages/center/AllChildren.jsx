import CenterLayout from "../../layouts/CenterLayout";
import { ChildrenGrid } from "../../components/AllChildren";

import "./AllChildren.css";

function AllChildren() {

    return (

        <CenterLayout>

            <div className="all-children-page">

                <div className="all-children-header">

                    <h1>All Children</h1>

                </div>

                <ChildrenGrid />

            </div>

        </CenterLayout>

    );

}

export default AllChildren;