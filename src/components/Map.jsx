import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import { Button, Stack } from 'react-bootstrap'
import "../styles/Map.css"

const Map = ({ bars, token }) => {

  const handleFavorite = (id) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ bar: { id } })
    };
    fetch('http://localhost:9000/favorite', requestOptions)
      .then(response => response.text())
      .then(data => (data));
  }


  return (

    <div>
      <MapContainer center={[50.6292, 3.0573]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bars.map(({ id, name, latitude, longitude }) =>
          <Marker key={id} position={[latitude, longitude]}>
            <Popup>
              <Stack direction="vertical" className='text-center' gap={2}>
                <span>
                  {name}
                </span>
                <Button
                  value={id}
                  onClick={() => handleFavorite(id)}>
                  Ajouter
                </Button>
              </Stack>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )

}


export default Map
