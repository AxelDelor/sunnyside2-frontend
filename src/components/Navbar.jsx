import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import sunny from "../assets/sunny.png";
import poweroff from "../assets/right-from-bracket-solid-full.svg";

const NavBar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const userName = token && token !== "null"
  ? JSON.parse(atob(token.split(".")[1])).sub
  : null

  return (
    <div className=" navbar p-3">
      <Link to="/" className="text-decoration-none">
        <Stack direction="horizontal" gap={2}>
          <img className="logo" src={sunny} alt="logo soleil" />
          <span className="title" href="#home">
            Sunnyside
          </span>
        </Stack>
      </Link>
      <div>
        {token && token !== "null" ? (
          <Stack direction="horizontal" className="ms-auto" gap={2}>
            <span className="profile-letter">
              {userName.charAt(0).toUpperCase() + userName.slice(1)
                }
            </span>
            <img style={{cursor: "pointer"}} className="logout-logo" src={poweroff} alt="Déconnexion" onClick={handleLogout} />
          </Stack>
        ) : (
          <Stack direction="horizontal" className="ms-auto" gap={2}>
            <Button as={Link} to="/login" variant="success">
              Connexion
            </Button>
            <Button as={Link} to="/register" variant="warning">
              Création
            </Button>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default NavBar;
