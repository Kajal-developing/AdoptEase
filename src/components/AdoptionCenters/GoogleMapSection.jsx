import { useState } from "react";

import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader
} from "@react-google-maps/api";

import "./AdoptionCenters.css";


function GoogleMapSection({ cityName, centers }) {

    const [selectedCenter, setSelectedCenter] =
        useState(null);


    const { isLoaded } = useJsApiLoader({

        googleMapsApiKey:
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    });


    const validCenters = (centers || []).filter(

        (center) =>

            center.latitude !== null &&
            center.longitude !== null &&
            center.latitude !== 0 &&
            center.longitude !== 0

    );


    /*
     * Default city coordinates
     */

    const cityCoordinates = {

        PUNE: {
            lat: 18.520430,
            lng: 73.856744
        },

        MUMBAI: {
            lat: 19.076090,
            lng: 72.877426
        },

        "CH. SAMBHAJINAGAR": {
            lat: 19.876165,
            lng: 75.343314
        },

        DELHI: {
            lat: 28.613939,
            lng: 77.209021
        }

    };


    const mapCenter =
        validCenters.length > 0

            ? {
                lat: validCenters[0].latitude,
                lng: validCenters[0].longitude
            }

            : cityCoordinates[cityName] ||
              cityCoordinates.PUNE;


    if (!isLoaded) {

        return (
            <h2>
                Loading Map...
            </h2>
        );

    }


    return (

        <section className="map-section">

            <div className="city-title">

                {cityName}

                <span className="city-arrow">
                    &rsaquo;
                </span>

            </div>


            <GoogleMap

                mapContainerStyle={{
                    width: "100%",
                    height: "450px"
                }}

                center={mapCenter}

                zoom={12}

            >

                {validCenters.map((center) => (

                    <Marker

                        key={center.centerId}

                        position={{
                            lat: center.latitude,
                            lng: center.longitude
                        }}

                        onClick={() =>
                            setSelectedCenter(center)
                        }

                    />

                ))}


                {selectedCenter && (

                    <InfoWindow

                        position={{
                            lat: selectedCenter.latitude,
                            lng: selectedCenter.longitude
                        }}

                        onCloseClick={() =>
                            setSelectedCenter(null)
                        }

                    >

                        <div>

                            <h3>
                                {selectedCenter.centerName}
                            </h3>

                            <p>
                                {selectedCenter.address}
                            </p>

                            <p>
                                {selectedCenter.contactNo}
                            </p>

                        </div>

                    </InfoWindow>

                )}

            </GoogleMap>

        </section>

    );

}


export default GoogleMapSection;