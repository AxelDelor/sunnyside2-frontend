import { Container, Form, Button, Stack } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import sunny from "../assets/sunny.png";
import hero from "../assets/hero.png";
import poweroff from "../assets/right-from-bracket-solid-full.svg";

const NavBar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

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
              {JSON.parse(atob(token.split(".")[1]))
                .sub
                // .charAt(0)
                // .toUpperCase()
                }
            </span>
            <img className="logout-logo" src={poweroff} alt="Déconnexion" onClick={handleLogout} />
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
