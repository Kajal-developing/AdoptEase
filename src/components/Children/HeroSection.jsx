import "./Children.css";
import { Link } from "react-router-dom";

function HeroSection() {

    return (

        <section className="children-hero">

            <div className="children-hero-overlay">

                <h1>
                    Children
                </h1>

                <div className="children-breadcrumb">

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

                    <span className="breadcrumb-current">
                        Children
                    </span>

                </div>

            </div>

        </section>

    );

}

export default HeroSection;