import { useState, useEffect } from "react";
import Map from "./components/Map"
import Favorite from "./components/Favorite";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./styles/App.css"
import { Card } from "react-bootstrap";

const App = () => {

  const [bars, setBars] = useState([])

  useEffect(() => {
    fetch("http://localhost:9000/bars")
      .then(res => res.json())
      .then(data => setBars(data));
  }, []);

  console.log(bars)

  return (
    <Container>
      <Row className="g-2 page-content p-3">
        <Col sm={12} lg={{ span: 8, order: 2 }}>
          <Card>
            <Map className='map-card' bars={bars} />
          </Card>
        </Col>
        <Col sm={12} lg={{ span: 4, order: 1 }}>
          <Card>
            <Favorite className='favorites-card' bars={bars} />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}


export default App
