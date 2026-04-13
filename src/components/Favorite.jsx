import { useState, useEffect } from "react";

const Favorite = ({ token, refreshTrigger }) => {

  const [favorites, setFavorites] = useState([])

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  };

  useEffect(() => {
    fetch("http://localhost:9000/favorites", requestOptions)
      .then(res => res.json())
      .then(data => setFavorites(data));
  }, [token, refreshTrigger]);



  return (
    <>
      <span className="card-header fw-bold">Liste des bars</span>
      <ul className="list-group list-group-flush">
        {
          favorites.map(({ id, bar }) =>
            <div key={id}>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {bar.name}
              </li>
            </div>

          )
        }
      </ul>
    </>

  )
}

export default Favorite
