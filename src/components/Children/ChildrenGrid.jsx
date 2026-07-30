import "./Children.css";

import childrenData from "../../data/childrenData";

import ChildCard from "./ChildCard";

function ChildrenGrid({ centerId }) {

    const filteredChildren = childrenData.filter(

        child => child.centerId === Number(centerId)

    );

    return (

        <section className="children-grid-section">

            {

                filteredChildren.length === 0 ?

                    (

                        <div className="no-children">

                            <h2>No Children Available</h2>

                            <p>

                                There are currently no children
                                available for this adoption center.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="children-grid">

                            {

                                filteredChildren.map(child => (

                                    <ChildCard

                                        key={child.id}

                                        child={child}

                                    />

                                ))

                            }

                        </div>

                    )

            }

        </section>

    );

}

export default ChildrenGrid;