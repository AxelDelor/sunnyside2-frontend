import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import Map from "../components/Map";
import Favorite from "../components/Favorite";
import "../styles/Home.css";

const Home = ({ token }) => {
  const [bars, setBars] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedBar, setSelectedBar] = useState();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bars`)
      .then((res) => res.json())
      .then((data) => setBars(data));
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch(`${import.meta.env.VITE_API_URL}/favorites`, requestOptions)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, [token, refreshTrigger]);

  return (
    <>
      <div className="page-content p-3">
        <Card className="map-card">
          <Map
            bars={bars}
            token={token}
            selectedBar={selectedBar}
            setRefreshTrigger={setRefreshTrigger}
            favorites={favorites}
          />
        </Card>
        <Card className="favorites-card">
          <Favorite
            token={token}
            setSelectedBar={setSelectedBar}
            setRefreshTrigger={setRefreshTrigger}
            refreshTrigger={refreshTrigger}
            setFavorites={setFavorites}
            favorites={favorites}
          />
        </Card>
      </div>
    </>
  );
};

export default Home;
