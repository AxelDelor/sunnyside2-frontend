import {
  Container,
  Navbar,
  Form,
  Button,
  Stack,
  Row,
  Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import sunny from "../assets/sunny.png";
import hero from "../assets/hero.png";

const NavBar = ({ setToken, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    fetch("http://localhost:9000/api/auth/login", requestOptions)
      .then((response) => response.text())
      .then((data) => setToken(data));
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <Navbar expand="lg" className="p-3">
      <Link to="/" className="text-decoration-none">
        <Stack direction="horizontal" gap={2}>
          <img className="logo" src={sunny} alt="logo soleil" />
          <span className="title" href="#home">
            SunnySide
          </span>
        </Stack>
      </Link>
      <Navbar.Toggle aria-controls="navbar-content" />
      <Navbar.Collapse id="navbar-content">
        {token && token !== "null" ? (
          <Stack direction="horizontal" className="ms-auto" gap={2}>
            <span className="profile-letter">
              {JSON.parse(atob(token.split(".")[1]))
                .sub.charAt(0)
                .toUpperCase()}
            </span>
            <Button onClick={handleLogout} variant="danger">
              Déconnexion
            </Button>
          </Stack>
        ) : (
          <Form className="ms-auto">
            <Row>
              <Col>
                <Form.Control
                  type="email"
                  placeholder="name@mail.com"
                  value={email}
                  onChange={handleEmail}
                />
              </Col>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="mot de passe"
                  value={password}
                  onChange={handlePassword}
                />
              </Col>
              <Col className="d-grid">
                <Button variant="success" onClick={handleLogin}>
                  Connexion
                </Button>
              </Col>
              <Col className="d-grid">
                <Button as={Link} to="/register" variant="warning">
                  Création
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
