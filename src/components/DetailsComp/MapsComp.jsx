import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

const containerStyle = {
  width: "400px",
  height: "340px",
};

function MapsComp({ location }) {
  console.log("location", location);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkdS1NftiRN32ZWGnNPL5TWWOWwkyCyDs",
  });
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(null);
  const [google, setGoogle] = useState(null);
  const [initialZoom, setInitialZoom] = useState(1);

  useEffect(() => {
    if (window.google) {
      setGoogle(window.google);
    }

    if (isLoaded && google && center) {
      const bounds = new google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setInitialZoom(1); // Zoom değeri değiştirildi
    }
  }, [isLoaded, google, center, map]);

  useEffect(() => {
    if (isLoaded && google) {
      const geocoder = new google.maps.Geocoder();
      if (location) {
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === "OK") {
            const place = results[0].geometry.location;

            console.log("place", place);
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
  }, [isLoaded, google, location]);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {center && (
        <Marker
          position={center}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new google.maps.Size(40, 40),
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapsComp;
