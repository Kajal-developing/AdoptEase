import "./AdoptionProcedureContent.css";
import { EXTERNAL_LINKS } from "../../../constants/externalLinks";
import {
    ClipboardList,
    BadgeCheck,
    Scale,
    FileText,
    CircleHelp
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function AdoptionProcedureContent() {
    const location = useLocation();

    const termsPath = location.pathname.startsWith("/admin")
        ? "/admin/terms-conditions"
        : location.pathname.startsWith("/center")
            ? "/center/terms-conditions"
            : "/parent/terms-conditions";

    return (
        <section className="adoption-procedure-container">

            <h1 className="procedure-title">
                Adoption Procedure
            </h1>

            {/* Section 1 */}

            <section className="procedure-section">

                <div className="section-heading">

                    <ClipboardList size={28} />

                    <h2>1. Step-By-Step Process</h2>

                </div>

                <ul>

                    <li>
                        Registration on <strong>CARINGS</strong> – Prospective
                        Adoptive Parents (PAPs) register online by creating
                        an account and completing basic KYC details.
                        {" "}
                        <a
                            href={EXTERNAL_LINKS.CARINGS}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit CARINGS
                        </a>
                    </li>

                    <li>
                        Upload the required documents and complete the
                        Home Study Report (HSR), conducted by a
                        Specialized Adoption Agency (SAA).
                    </li>

                    <li>
                        Child profiles are matched based on registration
                        date, age preference, location and other
                        preferences provided during registration.
                    </li>

                    <li>
                        After accepting a child referral, the child is
                        placed under pre-adoption foster care until the
                        legal process is completed.
                    </li>

                    <li>
                        The adoption petition is filed before the
                        competent District Court.
                    </li>

                    <li>
                        The Court issues the final adoption order,
                        legally transferring parenthood.
                    </li>

                    <li>
                        Post-adoption follow-up visits are conducted for
                        approximately two years to ensure the child's
                        well-being.
                    </li>

                </ul>

            </section>

            {/* Section 2 */}

            <section className="procedure-section">

                <div className="section-heading">

                    <BadgeCheck size={28} />

                    <h2>2. Eligibility Criteria</h2>

                </div>

                <ul>

                    <li>
                        <strong>Marital Status:</strong> Married couples
                        with a stable relationship or single individuals
                        (male/female) can apply.
                    </li>

                    <li>
                        <strong>Citizenship:</strong> Indian Citizens,
                        NRIs, Overseas Citizens of India (OCI), and
                        eligible foreign citizens may adopt according
                        to CARA guidelines.
                    </li>

                    <li>
                        <strong>Age:</strong> Eligibility depends upon
                        the age of the prospective parent and the age of
                        the child.
                    </li>

                    <li>
                        Applicants should be physically, mentally and
                        financially capable of raising a child.
                    </li>

                    <li>
                        Applicants should not have any serious criminal
                        record or life-threatening illness.
                    </li>

                </ul>

            </section>

            {/* Section 3 */}

            <section className="procedure-section">

                <div className="section-heading">

                    <Scale size={28} />

                    <h2>3. Governing Law</h2>

                </div>

                <p>

                    Adoption in India is governed primarily by the
                    Juvenile Justice (Care and Protection of Children)
                    Act, 2015 along with the Adoption Regulations
                    issued by CARA.

                </p>

                <a
                    href={EXTERNAL_LINKS.CARA}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn more from CARA
                </a>

            </section>

            {/* Section 4 */}

            <section className="procedure-section">

                <div className="section-heading">

                    <FileText size={28} />

                    <h2>4. Required Documents</h2>

                </div>

                <ul>

                    <li>Identity Proof (Aadhaar / Passport / PAN)</li>

                    <li>Address Proof</li>

                    <li>Income Certificate / Salary Slips / IT Returns</li>

                    <li>Marriage Certificate (if applicable)</li>

                    <li>Medical Fitness Certificate</li>

                    <li>Passport Size Photographs</li>

                </ul>

            </section>

            {/* Section 5 */}

            <section className="procedure-section">

                <div className="section-heading">

                    <CircleHelp size={28} />

                    <h2>5. Frequently Asked Questions</h2>

                </div>

                <div className="faq">

                    <p>

                        <strong>
                            How long does adoption take?
                        </strong>

                        <br />

                        The duration varies depending on the child's
                        profile and legal formalities. It may take a
                        few months to a few years.

                    </p>

                    <p>

                        <strong>
                            Can a single parent adopt?
                        </strong>

                        <br />

                        Yes. Single men and women are eligible as per
                        CARA regulations.

                    </p>

                    <p>

                        <strong>
                            Can NRIs adopt?
                        </strong>

                        <br />

                        Yes. NRIs and OCIs can adopt through the
                        inter-country adoption framework.

                    </p>

                </div>

            </section>

            <Link
                to={termsPath}
                className="terms-link"
            >
                Terms & Conditions
            </Link>

        </section>
    );
}

export default AdoptionProcedureContent;