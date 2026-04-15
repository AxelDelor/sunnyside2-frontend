import { Card, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import Map from "../components/Map";
import Favorite from "../components/Favorite";

const Home = ({ token }) => {

  const [bars, setBars] = useState([])
  const [refreshTrigger, setRefreshTrigger] = useState(0)


  useEffect(() => {
    fetch("http://localhost:9000/bars")
      .then(res => res.json())
      .then(data => setBars(data));
  }, []);

  return (
    <>
      <Container>
        <Row className="g-2 page-content p-3">
          <Col sm={12} lg={{ span: 8, order: 2 }}>
            <Card>
              <Map className='map-card' bars={bars} token={token} setRefreshTrigger={setRefreshTrigger} />
            </Card>
          </Col>
          <Col sm={12} lg={{ span: 4, order: 1 }}>
            <Card>
              <Favorite className='favorites-card' token={token} refreshTrigger={refreshTrigger} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
