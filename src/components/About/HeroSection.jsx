import "../../pages/common/About.css";
import aboutImage from "../../assets/images/family-home.jpg";

function HeroSection() {

    return (

        <section className="about-hero">

            <div className="about-left">

                <span className="hero-tag">

                    Welcome to AdoptEase

                </span>

                <h1>

                    Building Families Through Love and Care

                </h1>

                <p>

                    AdoptEase is a secure and transparent adoption platform
                    that connects verified adoption centers with prospective
                    parents, making the adoption journey simple, safe, and
                    trustworthy.

                </p>


            </div>

            <div className="about-right">

                <img
                    src={aboutImage}
                    alt="Happy Family"
                />

            </div>

        </section>

    );

}

export default HeroSection;