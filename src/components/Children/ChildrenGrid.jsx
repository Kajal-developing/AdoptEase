import "./Children.css";
import ChildCard from "./ChildCard";

function ChildrenGrid({ children = [] }) {

    return (

        <section className="children-grid-section">

            {

                children.length === 0 ?

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
                                children.map(child => (

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