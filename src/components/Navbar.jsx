import { Container, Navbar, Form, InputGroup, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"
import sunny from "../assets/sunny.png"


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
    <Navbar>
      <Container>
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
        <Link to="/" className="text-decoration-none">
          <div className='navbar-logo-title'>
            <img className='logo' src={sunny} alt="" />
            <span className="title" href="#home">SunnySide</span>
          </div>
          </Link>
          {token && token !== "null" ? (
            <div className="d-flex align-items-center justify-content-center flex-row gap-2">
              <span className="text-white">{JSON.parse(atob(token.split('.')[1])).sub}</span>
              <Button onClick={handleLogout} variant='danger'>Déconnexion</Button>
            </div>
          ) : (
            <div className="d-flex flex-row align-items-center justify-content-between gap-2">
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
              <Button variant='success' onClick={handleLogin}>Connexion</Button>
              <Link to="register">
              <Button variant='warning'>Création</Button>
              </Link>
            </div>
          )
          }
        </div>
      </Container>
    </Navbar>
  )

}


export default NavBar
