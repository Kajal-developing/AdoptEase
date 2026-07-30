import "./AdoptionCenters.css";
import { Link } from "react-router-dom";

function HeroSection() {

    return (

        <section className="adoption-center-hero">

            <div className="hero-overlay">

                <h1>

                    Adoption Centers

                </h1>

                <p className="breadcrumb">

                    <Link
                        to="/cities"
                        className="breadcrumb-link"
                    >
                        Cities
                    </Link>

                    <span className="breadcrumb-separator">
                        &gt;
                    </span>

                    <span className="breadcrumb-current">
                        Adoption Centers
                    </span>

                </p>

            </div>

        </section>

    );

}

export default HeroSection;