import { Container, Navbar, Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import "../styles/Navbar.css"


const NavBar = ({ setToken, token }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };
    fetch('http://localhost:9000/api/auth/login', requestOptions)
      .then(response => response.text())
      .then(data => setToken(data));
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem("token")
  }


  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
    }
  }, [token])


  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <Container>
        <Navbar.Brand className="title" href="#home">SunnySide</Navbar.Brand>

        {token && token !== "null" ? (

          <>
            <span>Connecté : {JSON.parse(atob(token.split('.')[1])).sub}</span>
            <Button onClick={handleLogout}>Déconnexion</Button>
          </>
        ) : (
          <Form inline>
            <Row>
              <Col>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                  <Form.Control
                    placeholder="user@mail.com"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    value={email}
                    onChange={handleEmail}
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                  <Form.Control
                    placeholder="********"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    value={password}
                    onChange={handlePassword}
                  />
                </InputGroup>
              </Col>
              <Col>
                <Button onClick={handleLogin}>Connexion</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </Navbar>
  )

}


export default NavBar
