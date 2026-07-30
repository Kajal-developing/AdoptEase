import "./NoticeBox.css";
import { FaExclamationTriangle } from "react-icons/fa";

function NoticeBox({
    checked,
    onChange,
}) {

    return (

        <div className="notice-box">

            <div className="notice-header">

                <FaExclamationTriangle className="notice-icon" />

                <div>

                    <h4>Important Notice</h4>

                    <p>

                        This application helps you explore adoption
                        centers and schedule meetings.

                        Legal adoption can only be completed through
                        CARA's official portal.

                    </p>

                    <a
                        href="https://cara.wcd.gov.in"
                        target="_blank"
                        rel="noreferrer"
                    >
                        https://cara.wcd.gov.in
                    </a>

                </div>

            </div>

            <label className="notice-check">

                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />

                <span>

                    I understand that legal adoption
                    requires registration on CARA.

                </span>

            </label>

        </div>

    );

}

export default NoticeBox;