import { useEffect, useState } from "react";

import "./../../pages/admin/CenterRequests.css";

import RequestCard from "./RequestCard";

import { getPendingCenters } from "../../api/authApi";

function RequestsGrid() {

    const [centers, setCenters] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    const fetchCenters = async () => {

        try {

            const response = await getPendingCenters();

            setCenters(response.data);

        } catch (error) {

            console.error(
                "Unable to load center requests:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load center requests."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchCenters();

    }, []);


    if (loading) {

        return (

            <div className="center-requests-grid">

                <p>
                    Loading center requests...
                </p>

            </div>

        );

    }


    if (error) {

        return (

            <div className="center-requests-grid">

                <p style={{ color: "#D85A30" }}>
                    {error}
                </p>

            </div>

        );

    }


    if (centers.length === 0) {

        return (

            <div className="center-requests-grid">

                <p>
                    No pending center requests.
                </p>

            </div>

        );

    }


    return (

        <section className="center-requests-grid">

            {centers.map((center) => (

                <RequestCard
                    key={center.centerId}
                    center={center}
                    onDecision={fetchCenters}
                />

            ))}

        </section>

    );

}

export default RequestsGrid;