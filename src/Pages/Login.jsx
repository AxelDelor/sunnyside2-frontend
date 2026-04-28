import { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, requestOptions)
      .then((response) => response.text())
      .then((data) => {
        setToken(data);
        console.log(data);
        navigate("/")
      });
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <Container>
      <Form className="mt-2">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@mail.com"
            value={email}
            onChange={handleEmail}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="*********"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>
      </Form>
      <Button
      // as={Link}
      // to={"/"}
      variant="success"
      onClick={handleLogin}>
        Connexion
      </Button>
    </Container>
  );
};

export default Login;
