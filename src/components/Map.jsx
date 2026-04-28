import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { Button, Stack } from "react-bootstrap";
import { useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import "../styles/Map.css";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const FlyToBar = ({ selectedBar, markerRefs }) => {
  const map = useMap();

  useEffect(() => {
    console.log(selectedBar);
    if (selectedBar) {
      map.flyTo([selectedBar.latitude, selectedBar.longitude], 17);

      setTimeout(() => {
        markerRefs.current[selectedBar.id]?.openPopup();
      }, 300);
    }
  }, [selectedBar]);

  return null;
};

const MapWatcher = ({ onZoomChange, onBoundsChange }) => {
  const map = useMapEvents({
    moveend: () => {
      onBoundsChange(map.getBounds());
    },
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
  });
  return null;
};

const Map = ({ bars, token, setRefreshTrigger, selectedBar, favorites }) => {
  const [currentZoom, setCurrentZoom] = useState(13);
  const [bounds, setBounds] = useState(null);

  const handleFavorite = (id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ bar: { id } }),
    };
    fetch(`${import.meta.env.VITE_API_URL}/favorite`, requestOptions)
      .then((response) => response.text())
      .then(() => setRefreshTrigger((prev) => prev + 1));
  };

  const markerRefs = useRef({});

  const visibleBars = bounds
    ? bars.filter(
        (bar) =>
          bounds.contains([bar.latitude, bar.longitude]) ||
          bar.id === selectedBar?.id
      )
    : bars;

  return (
    <>
      <MapContainer
        center={[50.6292, 3.0573]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <MapWatcher onZoomChange={setCurrentZoom} onBoundsChange={setBounds} />
        <FlyToBar selectedBar={selectedBar} markerRefs={markerRefs} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {visibleBars.map(({ id, name, latitude, longitude }) => {
          const isFavorite = favorites.find((fav) => fav.bar.id === id);
          return currentZoom >= 15 ? (
            <Marker
              key={id}
              position={[latitude, longitude]}
              ref={(el) => (markerRefs.current[id] = el)}
            >
              <Popup>
                <Stack direction="vertical" className="text-center" gap={2}>
                  <span>{name}</span>
                  {token && token !== "null" ? (
                    <Button
                      value={id}
                      onClick={() => handleFavorite(id)}
                      disabled={!!isFavorite}
                      variant={isFavorite ? "warning" : "primary"}
                    >
                      {isFavorite ? "Déjà ajouté" : "Ajouter"}
                    </Button>
                  ) : null}
                </Stack>
              </Popup>
            </Marker>
          ) : null;
        })}
      </MapContainer>
    </>
  );
};

export default Map;
