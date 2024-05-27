import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DataTable from './DataTable';
import InfectionMap from './InfectionMap';
import StatsCards from './StatsCards';
import RegionBarChart from './RegionBarChart';
import InfectionChart from './InfectionChart';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  return (
    <Container fluid className="p-4">
      <h1 className="text-center mb-4">Dashboard des Infections</h1>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="p-3">
            <DataTable />
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3">
            <InfectionChart />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <StatsCards />
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="p-3">
            <InfectionMap />
          </Card>
        </Col>
      </Row>

      <p></p> {/* <== Im SO SORRY FOR THAT but im tired ... i will finish it later */}

      <Row>
        <Col md={12}>
          <Card className="p-3">
            <RegionBarChart />
          </Card>
        </Col>
      </Row>




    </Container>
  );
}

export default Dashboard;
