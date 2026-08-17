import { useEffect, useState } from "react";

import "./../../pages/admin/ParentRequests.css";

import RequestCard from "./RequestCard";

import { getPendingParents } from "../../api/authApi";

import { useSearchParams } from "react-router-dom";

function RequestsGrid() {

    const [parents, setParents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();

    const searchTerm =
        searchParams.get("search")?.toLowerCase().trim() || "";


    useEffect(() => {

        const fetchParents = async () => {

            try {

                const response =
                    await getPendingParents();

                setParents(response.data);

            }
            catch (error) {

                console.error(
                    "Unable to load pending parents:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load pending parent requests."
                );

            }
            finally {

                setLoading(false);

            }

        };

        fetchParents();

    }, []);


    // Remove processed parent from UI
    const removeParent = (userId) => {

        setParents((currentParents) =>
            currentParents.filter(
                (parent) =>
                    parent.userId !== userId
            )
        );

    };


    // Filter parents
    const filteredParents = parents.filter((parent) => {

        return (

            parent.userName
                ?.toLowerCase()
                .includes(searchTerm)

            ||

            parent.email
                ?.toLowerCase()
                .includes(searchTerm)

            ||

            parent.contactNo
                ?.toLowerCase()
                .includes(searchTerm)

        );

    });


    if (loading) {

        return (

            <div className="requests-grid-message">

                Loading parent requests...

            </div>

        );

    }


    if (error) {

        return (

            <div className="requests-grid-message error">

                {error}

            </div>

        );

    }


    if (parents.length === 0) {

        return (

            <div className="requests-grid-message">

                No pending parent requests.

            </div>

        );

    }


    if (filteredParents.length === 0) {

        return (

            <div className="requests-grid-message">

                <h2>
                    No parent found
                </h2>

                <p>
                    No parent matches "{searchTerm}".
                </p>

            </div>

        );

    }


    return (

        <section className="requests-grid">

            {filteredParents.map((parent) => (

                <RequestCard
                    key={parent.userId}
                    parent={parent}
                    onProcessed={removeParent}
                />

            ))}

        </section>

    );

}

export default RequestsGrid;