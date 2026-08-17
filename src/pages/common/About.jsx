import "./About.css";

import { useLocation } from "react-router-dom";

import ParentLayout from "../../layouts/ParentLayout";
import CenterLayout from "../../layouts/CenterLayout";

import {
    HeroSection,
    MissionSection,
    ProcessSection,
    WhyChooseSection
} from "../../components/About";

function About() {

    const location = useLocation();

    const Layout = location.pathname.startsWith("/center")
        ? CenterLayout
        : ParentLayout;

    return (

        <Layout>

            <div className="about-page">

                <HeroSection />

                <MissionSection />

                <ProcessSection />

                <WhyChooseSection />

            </div>

        </Layout>

    );

}

export default About;