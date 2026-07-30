import "./AlertBanner.css";

function AlertBanner({
    title,
    children,
    type = "info",
}) {
    return (
        <div className={`alert-banner ${type}`}>

            <h3>{title}</h3>

            <div className="alert-content">

                {children}

            </div>

        </div>
    );
}

export default AlertBanner;