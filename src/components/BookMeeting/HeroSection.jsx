import "../../pages/parent/BookMeeting.css";
import { Link, useParams } from "react-router-dom";

function HeroSection() {

    const { city, centerId } = useParams();

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
                        to={`/adoption-centers/${city}`}
                        className="breadcrumb-link"
                    >
                        Adoption Centers
                    </Link>

                    <span className="breadcrumb-separator">
                        &gt;
                    </span>

                    <Link
                        to={`/children/${city}/${centerId}`}
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