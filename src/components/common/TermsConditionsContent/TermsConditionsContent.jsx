import "./TermsConditionsContent.css";

import {
    BadgeCheck,
    ShieldCheck,
    Lock,
    CircleAlert,
    Users,
    Home,
    IndianRupee,
    UserX,
    MessageCircle
} from "lucide-react";

function TermsConditionsContent() {

    return (

        <section className="terms-container">

            <h1 className="terms-title">
                Terms & Conditions
            </h1>

            <section className="terms-section">

                <div className="section-heading">

                    <BadgeCheck size={28}/>

                    <h2>1. Eligibility</h2>

                </div>

                <ul>

                    <li>
                        By registering as a Prospective Adoptive Parent on AdoptEase,
                        you confirm that all personal information provided is accurate.
                    </li>

                    <li>
                        You agree that you satisfy the eligibility criteria prescribed
                        under CARA and the Juvenile Justice Act.
                    </li>

                </ul>

            </section>

            <section className="terms-section">

                <div className="section-heading">

                    <ShieldCheck size={28}/>

                    <h2>2. Role of AdoptEase</h2>

                </div>

                <ul>

                    <li>
                        AdoptEase acts only as a facilitation platform connecting
                        parents and adoption centres.
                    </li>

                    <li>
                        Final adoption approval rests solely with authorised agencies
                        and the competent court.
                    </li>

                </ul>

            </section>

            <section className="terms-section">

                <div className="section-heading">

                    <Lock size={28}/>

                    <h2>3. Data & Privacy</h2>

                </div>

                <ul>

                    <li>
                        Personal information and uploaded documents will be used only
                        for verification and adoption-related processes.
                    </li>

                    <li>
                        Information will not be shared without legal necessity or
                        user consent.
                    </li>

                </ul>

            </section>

            <section className="terms-section">

                <div className="section-heading">

                    <CircleAlert size={28}/>

                    <h2>4. Accuracy of Information</h2>

                </div>

                <ul>

                    <li>
                        Providing false or misleading information may lead to
                        suspension of the account.
                    </li>

                    <li>
                        Fake documents can result in permanent account termination.
                    </li>

                </ul>

            </section>

            <section className="terms-section">

                <div className="section-heading">

                    <Users size={28}/>

                    <h2>5. No Guarantee of Matching</h2>

                </div>

                <ul>

                    <li>
                        Registration does not guarantee child allocation.
                    </li>

                    <li>
                        Matching depends upon availability, eligibility and
                        CARA regulations.
                    </li>

                </ul>

            </section>

            <section className="terms-section">

                <div className="section-heading">

                    <Home size={28}/>

                    <h2>6. Home Study & Verification</h2>

                </div>

                <ul>

                    <li>
                        Parents agree to cooperate during home visits and
                        document verification.
                    </li>

                </ul>

            </section>

            <section className="terms-section">

                <div className="section-heading">

                    <IndianRupee size={28}/>

                    <h2>7. Fees</h2>

                </div>

                <ul>

                    <li>
                        Platform fees, if applicable, cover only documentation
                        and administrative purposes.
                    </li>

                    <li>
                        No payment guarantees child matching or approval.
                    </li>

                </ul>

            </section>

            <section className="terms-section">

                <div className="section-heading">

                    <UserX size={28}/>

                    <h2>8. Account Termination</h2>

                </div>

                <ul>

                    <li>
                        AdoptEase reserves the right to suspend or deactivate
                        accounts violating these terms.
                    </li>

                </ul>

            </section>

            <section className="terms-section">

                <div className="section-heading">

                    <MessageCircle size={28}/>

                    <h2>9. Grievance Redressal</h2>

                </div>

                <ul>

                    <li>
                        Users may contact the AdoptEase support team through
                        the Contact page for complaint resolution.
                    </li>

                </ul>

            </section>

        </section>

    );

}

export default TermsConditionsContent;