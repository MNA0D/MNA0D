import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { infectionData } from '../data';

function StatsCards() {
    // Calculer le nombre total d'infections
    const totalInfections = infectionData.length;

    // Trouver la région la plus affectée et le nombre d'infections
    const regionCount = infectionData.reduce((acc, data) => {
        acc[data.region] = (acc[data.region] || 0) + 1;
        return acc;
    }, {});

    const mostAffectedRegion = Object.keys(regionCount).reduce((a, b) => regionCount[a] > regionCount[b] ? a : b);
    const mostAffectedRegionCount = regionCount[mostAffectedRegion];

    return (
        <>
            <h2 className="text-center mb-4">Statistiques des Infections</h2>
            <p className="text-center">Ce graphique montre le nombre de personnes infectées au total et la région la plus touchée.</p>
            <Row>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total des Infections</Card.Title>
                            <Card.Text>{totalInfections}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Région la Plus Affectée</Card.Title>
                            <Card.Text>{mostAffectedRegion} ({mostAffectedRegionCount} infections)</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default StatsCards;
