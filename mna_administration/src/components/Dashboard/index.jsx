import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DataTable from './DataTable';
import InfectionMap from './InfectionMap';
import StatsCards from './StatsCards';
import RegionBarChart from './RegionBarChart';
import InfectionChart from './InfectionChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import { fetchInfectionData } from './fetchInfectionData';

function Dashboard() {
  const [infectionData, setInfectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchInfectionData();
        setInfectionData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - MNA0D</title>
      </Helmet>

      <Container fluid className="p-4">
        <h1 className="text-center mb-4">Dashboard des Infections</h1>

        <Row className="mb-4">
          <Col md={12}>
            <Card className="p-3">
              <DataTable infectionData={infectionData} />
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="p-3">
              <InfectionChart infectionData={infectionData} />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-3">
              <StatsCards infectionData={infectionData} />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card className="p-3">
              <InfectionMap infectionData={infectionData} />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card className="p-3">
              <RegionBarChart infectionData={infectionData} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
