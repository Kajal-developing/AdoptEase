import "./ChildHero.css";
import { Link } from "react-router-dom";

function ChildHero({
    title,
    parentPage,
    currentPage
}) {

    return (

        <section className="child-hero">

            <div className="child-hero-overlay">

                <h1>

                    {title}

                </h1>

                {

                    parentPage && currentPage && (

                        <div className="child-breadcrumb">

                            <Link
                                to="/center/all-children"
                                className="breadcrumb-link"
                            >
                                {parentPage}
                            </Link>

                            <span className="breadcrumb-separator">
                                &gt;
                            </span>

                            <span className="breadcrumb-current">
                                {currentPage}
                            </span>

                        </div>

                    )

                }

            </div>

        </section>

    );

}

export default ChildHero;