import { Form, Container, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useState } from "react"

const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [show, setShow] = useState(true)

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleRegister = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    };
    fetch('http://localhost:9000/api/auth/register', requestOptions)
      .then(response => response.text())
      // .then(data => setToken(data));

  }


  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="name" placeholder="CamilleF" value={name} onChange={handleName} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control type="email" placeholder="name@mail.com" value={email} onChange={handleEmail} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" placeholder="*********" value={password} onChange={handlePassword} />
        </Form.Group>
      </Form>
        <Button variant="success" onClick={() => {handleRegister(); setShow(true)}}>Créer votre compte</Button>
      { show && (
        <Alert className="mt-4" variant="success" onClose={() => setShow(false)} dismissible>
        Super! Votre compte vient d'être créé, vous pouvez maintenant vous connecter et ajouter vos bars favoris à partir de la carte.
      </Alert>
      )}
    </Container>
  )

}

export default Register
