import { useEffect, useState } from "react";

import ChildCard from "./ChildCard";
import AddChildCard from "./AddChildCard";

import { getCenterChildren } from "../../api/authApi";

import "../../pages/center/AllChildren.css";

import { useSearchParams } from "react-router-dom";

function ChildrenGrid() {

    const [children, setChildren] = useState([]);

    const [searchParams] = useSearchParams();

    const searchTerm =
        searchParams.get("search")?.toLowerCase().trim() || "";

    const user =
        JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const fetchChildren = async () => {

            try {

                const response =
                    await getCenterChildren(user.userId);

                console.log(
                    "Center Children:",
                    response.data
                );

                setChildren(response.data);

            }
            catch (error) {

                console.error(
                    "Error fetching children:",
                    error
                );

            }

        };

        if (user?.userId) {
            fetchChildren();
        }

    }, [user?.userId]);


    const filteredChildren = children.filter((child) => {

        return (
            child.childName
                ?.toLowerCase()
                .includes(searchTerm)
            ||
            child.name
                ?.toLowerCase()
                .includes(searchTerm)
        );

    });


    return (

        <section className="children-grid-section">

            <AddChildCard />

            {filteredChildren.length === 0 ? (

                <div className="requests-grid-message">

                    <h2>
                        No child found
                    </h2>

                    <p>
                        No child matches "{searchTerm}".
                    </p>

                </div>

            ) : (

                <div className="children-grid">

                    {filteredChildren.map((child) => (

                        <ChildCard
                            key={child.childId}
                            child={child}
                        />

                    ))}

                </div>

            )}

        </section>

    );

}

export default ChildrenGrid;