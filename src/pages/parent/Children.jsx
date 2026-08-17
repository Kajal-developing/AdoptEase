import "./Children.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ParentWideLayout from "../../layouts/ParentWideLayout";
import {
    getCenterById,
    getChildrenByCenter
} from "../../api/authApi";

import {
    HeroSection,
    AdoptionCenterInfo,
    ChildrenGrid
} from "../../components/Children";

function Children() {

    const { city, centerId } = useParams();

    const [center, setCenter] = useState(null);

    const [children, setChildren] = useState([]);

    useEffect(() => {

        const fetchCenter = async () => {

            try {

                const response =
                    await getCenterById(centerId);

                setCenter(response.data);

                const childrenResponse =
                    await getChildrenByCenter(centerId);

                setChildren(childrenResponse.data);

            }

            catch (error) {

                alert("Unable to load center.");

            }

        };

        fetchCenter();

    }, [centerId]);

    if (!center) {

        return <h2>Loading...</h2>;

    }

    return (

        <ParentWideLayout>

            <HeroSection
                city={city}
            />

            <AdoptionCenterInfo
                center={center}
            />

            <ChildrenGrid
                children={children}
            />

        </ParentWideLayout>

    );

}

export default Children;