import ChildCard from "./ChildCard";
import AddChildCard from "./AddChildCard";

import childrenData from "../../data/childrenData";

import "../../pages/center/AllChildren.css";

function ChildrenGrid() {

    return (

        <section className="children-grid-section">

            <AddChildCard />

            <div className="children-grid">

                {childrenData.map((child) => (

                    <ChildCard
                        key={child.id}
                        child={child}
                    />

                ))}

            </div>

        </section>

    );

}

export default ChildrenGrid;