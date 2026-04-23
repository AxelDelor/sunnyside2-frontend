import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../styles/Favorite.css";

const Favorite = ({ token, refreshTrigger, setRefreshTrigger }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch("http://localhost:9000/favorites", requestOptions)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, [token, refreshTrigger]);

  const handleDelete = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch(`http://localhost:9000/favorite/${id}`, requestOptions)
      .then((response) => response.text())
      .then(() => setRefreshTrigger((prev) => prev + 1));
  };

  return (
    <>
      <span className="card-header fw-bold">Liste des bars</span>
      <ul className="list-group list-group-flush favorites-list">
        {token && token !== "null" ? (
          favorites.map(({ id, bar }) => (
              <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{bar.name}</span>
                <Button variant="danger" onClick={() => handleDelete(id)}>
                  Supprimer
                </Button>
              </li>
          ))
        ) : (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {" "}
            Vous n'avez pas encore de favoris
          </li>
        )}
      </ul>
    </>
  );
};

export default Favorite;
