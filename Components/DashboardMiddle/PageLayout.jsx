import Script from "next/script";

<Script
  src={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`}
  strategy="beforeInteractive"
/>
import { useRef, useEffect, useState } from "react";

export default function AddressField() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        { types: ["geocode"] }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const location = place.geometry.location;
          setCoordinates({
            lat: location.lat(),
            lng: location.lng(),
          });
          setAddress(place.formatted_address);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.lng && mapRef.current) {
      new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 14,
      });

      new window.google.maps.Marker({
        position: coordinates,
        map: new window.google.maps.Map(mapRef.current, {
          center: coordinates,
          zoom: 14,
        }),
      });
    }
  }, [coordinates]);

  return (
    <div>
      <label className="text-sm font-medium">Address</label>
      <input
        ref={autocompleteRef}
        type="text"
        placeholder="Enter your address"
        className="w-full p-2 border rounded"
      />
      <div
        ref={mapRef}
        className="mt-4"
        style={{ height: "300px", width: "100%" }}
      ></div>
    </div>
  );
}
