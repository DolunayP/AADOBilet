import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "400px",
  height: "340px",
};

function MapsComp({ location }) {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const showInfoWindow = () => {
    setInfoWindowOpen(true);
  };
  const [mapLocation, setMapLocation] = useState("");
  const [address, setAddress] = useState("");
  console.log("location", location);
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkdS1NftiRN32ZWGnNPL5TWWOWwkyCyDs",
  });

  const [center, setCenter] = useState(null);
  const [google, setGoogle] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (window.google) {
      setGoogle(window.google);
      setMapLocation(location);
    }
  }, [location]);

  useEffect(() => {
    if (isLoaded && google) {
      const geocoder = new google.maps.Geocoder();
      if (location) {
        geocoder.geocode({ address: mapLocation }, (results, status) => {
          if (status === "OK") {
            const place = results[0].geometry.location;
            const addressText = results[0].formatted_address;
            setAddress(addressText);

            setCenter({
              lat: place.lat(),
              lng: place.lng(),
            });
          } else {
            console.error(
              "Geocode was not successful for the following reason: ",
              status
            );
          }
        });
      }
    }
  }, [isLoaded, google, location, mapLocation]);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return "Error";
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      zoom={19}
    >
      {center && (
        <Marker
          title="Marker Name"
          position={center}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new google.maps.Size(40, 40),
          }}
          onClick={showInfoWindow}
        >
          {infoWindowOpen && (
            <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
              <h1>{address}</h1>
            </InfoWindow>
          )}
        </Marker>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapsComp;
