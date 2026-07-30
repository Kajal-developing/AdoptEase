import { Link } from "react-router-dom";

import "../../pages/parent/BookMeeting.css";

function HeroSection() {

    return (

        <section className="meeting-hero">

            <div className="meeting-hero-overlay">

                <h1>

                    Meeting

                </h1>

                <div className="meeting-breadcrumb">

                    <Link
                        to="/cities"
                        className="breadcrumb-link"
                    >
                        Cities
                    </Link>

                    <span className="breadcrumb-separator">

                        &gt;

                    </span>

                    <Link
                        to="/adoption-centers/pune"
                        className="breadcrumb-link"
                    >
                        Adoption Centers
                    </Link>

                    <span className="breadcrumb-separator">

                        &gt;

                    </span>

                    <Link
                        to="/children/1"
                        className="breadcrumb-link"
                    >
                        Children
                    </Link>

                    <span className="breadcrumb-separator">

                        &gt;

                    </span>

                    <span className="breadcrumb-current">

                        Meeting

                    </span>

                </div>

            </div>

        </section>

    );

}

export default HeroSection;