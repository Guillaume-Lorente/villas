"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icônes personnalisées
const villaIcon = L.icon({
  iconUrl: "/leaflet/villa-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const plageIcon = L.icon({
  iconUrl: "/leaflet/plage-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Coordonnées
const VILLAS_POSITION = [16.32143, -61.78531];
const PLAGE_POSITION = [16.32229, -61.78864];

export default function Map() {
  return (
    <div className="h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden shadow-md">
      <p className="sr-only" id="map-description">
        Carte interactive indiquant l’emplacement du domaine Villas Grande Anse
        et la plage de Grande Anse à proximité.
      </p>
      <MapContainer
        aria-labelledby="map-description"
        role="application"
        center={VILLAS_POSITION}
        zoom={17}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <Marker position={VILLAS_POSITION} icon={villaIcon}>
          <Popup>Domaine des Villas Grande Anse</Popup>
        </Marker>
        <Marker position={PLAGE_POSITION} icon={plageIcon}>
          <Popup>Plage de Grande Anse à 200m du domaine</Popup>
        </Marker>
      </MapContainer>
      <a
        href="https://www.google.com/maps/place/133+Allée+du+Coeur,+97126+Deshaies,+Guadeloupe"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-center text-sm text-white underline block hover:text-jaune"
      >
        Ouvrir dans Google Maps
      </a>
    </div>
  );
}
