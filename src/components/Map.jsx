import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { Button, Stack } from "react-bootstrap";
import { useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import "../styles/Map.css";

const FlyToBar = ({ selectedBar, markerRefs}) => {
  const map = useMap();

  useEffect(() => {
    console.log(selectedBar)
    if (selectedBar) {
      map.flyTo([selectedBar.latitude, selectedBar.longitude], 17);
      markerRefs.current[selectedBar.id]?.openPopup()
    }
  }, [selectedBar]);

  return null;
};

const Map = ({ bars, token, setRefreshTrigger, selectedBar, favorites }) => {
  const handleFavorite = (id) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ bar: { id } }),
    };
    fetch("http://localhost:9000/favorite", requestOptions)
      .then((response) => response.text())
      .then(() => setRefreshTrigger((prev) => prev + 1));
  };

  const markerRefs = useRef({})

  return (
    <>
      <MapContainer
        center={[50.6292, 3.0573]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <FlyToBar selectedBar={selectedBar} markerRefs={markerRefs} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bars.map(({ id, name, latitude, longitude }) => {
          const isFavorite = favorites.find(fav => fav.bar.id === id)
          return (
          <Marker key={id} position={[latitude, longitude]} ref={el => markerRefs.current[id] = el}>
            <Popup>
              <Stack direction="vertical" className="text-center" gap={2}>
                <span>{name}</span>
                {token && token !== "null" ? (
                  <Button
                  value={id} onClick={() => handleFavorite(id)}
                  disabled={!!isFavorite}
                  variant={isFavorite ? "warning" : "primary"}>
                    { isFavorite ? "Déjà ajouté" : "Ajouter" }
                  </Button>
                ) : null}
              </Stack>
            </Popup>
          </Marker>
          )
        })}
      </MapContainer>
    </>
  );
};

export default Map;
