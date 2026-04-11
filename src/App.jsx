import { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Map from "./components/Map"
import Favorite from "./components/Favorite";
import NavBar from "./components/Navbar";
import "./styles/App.css"

const App = () => {

  const [bars, setBars] = useState([])
  const [token, setToken] = useState(null)


  useEffect(() => {
    fetch("http://localhost:9000/bars")
      .then(res => res.json())
      .then(data => setBars(data));
  }, []);

  console.log(bars)
  console.log(token)

  return (
    <Container>
      <NavBar setToken={setToken}/>
      <Row className="g-2 page-content p-3">
        <Col sm={12} lg={{ span: 8, order: 2 }}>
          <Card>
            <Map className='map-card' bars={bars} token={token} />
          </Card>
        </Col>
        <Col sm={12} lg={{ span: 4, order: 1 }}>
          <Card>
            <Favorite className='favorites-card' token={token} />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}


export default App
