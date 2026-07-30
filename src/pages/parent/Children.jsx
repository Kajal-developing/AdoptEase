import "./Children.css";

import { useParams } from "react-router-dom";

import ParentWideLayout from "../../layouts/ParentWideLayout";

import {
    HeroSection,
    AdoptionCenterInfo,
    ChildrenGrid
} from "../../components/Children";

function Children() {

    const { centerId } = useParams();

    return (

        <ParentWideLayout>

            <HeroSection />

            <AdoptionCenterInfo
                centerId={centerId}
            />

            <ChildrenGrid
                centerId={centerId}
            />


        </ParentWideLayout>

    );

}

export default Children;