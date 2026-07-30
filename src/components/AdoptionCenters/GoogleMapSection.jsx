import "./AdoptionCenters.css";

import {
    GoogleMap,
    Marker,
    LoadScript
} from "@react-google-maps/api";

function GoogleMapSection({ cityName }) {

    const center = {
        lat: 18.520430,
        lng: 73.856744
    };

    return (

        <section className="map-section">

            <div className="city-title">

                {cityName}

                <span className="city-arrow">
                    &rsaquo;
                </span>

            </div>

            <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            >

                <GoogleMap
                    mapContainerStyle={{
                        width: "100%",
                        height: "450px"
                    }}
                    center={center}
                    zoom={12}
                >

                    <Marker position={center} />

                </GoogleMap>

            </LoadScript>

        </section>

    );

}

export default GoogleMapSection;