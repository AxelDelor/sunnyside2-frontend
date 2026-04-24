import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import Map from "../components/Map";
import Favorite from "../components/Favorite";
import "../styles/Home.css";

const Home = ({ token }) => {
  const [bars, setBars] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetch("http://localhost:9000/bars")
      .then((res) => res.json())
      .then((data) => setBars(data));
  }, []);

  return (
    <>
      <div className="page-content p-3">
        <Card className="map-card">
          <Map
            bars={bars}
            token={token}
            setRefreshTrigger={setRefreshTrigger}
          />
        </Card>
        <Card className="favorites-card">
          <Favorite
            token={token}
            setRefreshTrigger={setRefreshTrigger}
            refreshTrigger={refreshTrigger}
          />
        </Card>
      </div>
    </>
  );
};

export default Home;
