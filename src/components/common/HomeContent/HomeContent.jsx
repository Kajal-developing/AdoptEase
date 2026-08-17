import "./HomeContent.css";
import NoticeBox from "../NoticeBox";

function HomeContent({
    image,
    heading,
    paragraphs,
    noticeChecked,
    onNoticeChange,
}) {
    return (

        <div className="home-content">

            <h1 className="home-heading">
                {heading}
            </h1>

            <div className="banner-wrapper">

                <img
                    src={image}
                    alt="Banner"
                    className="home-banner"
                />

            </div>

            <div className="home-description">

                {paragraphs.map((text, index) => (

                    <p key={index}>
                        {text}
                    </p>

                ))}

            </div>

            
            <NoticeBox
                checked={noticeChecked}
                disabled={noticeChecked}
                onChange={onNoticeChange}
            />
            
            <p className="notice-mandatory">
                * This declaration is mandatory before proceeding.
            </p>

        </div>

    );
}

export default HomeContent;