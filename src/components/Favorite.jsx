
const Favorite = ({ bars }) => {


  return (
    <>
      <span className="card-header fw-bold">Liste des bars</span>
      <ul className="list-group list-group-flush">
        {
          bars.map(({ id, name }) =>
            <div key={id}>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {name}
              </li>
            </div>

          )
        }
      </ul>
    </>

  )
}

export default Favorite
