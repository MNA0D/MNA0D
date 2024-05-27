import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { infectionData } from '../data';
import { Row, Col, Form } from 'react-bootstrap';

const InfectionChart = () => {
    const [startDate, setStartDate] = useState(new Date('2024-05-01'));
    const [endDate, setEndDate] = useState(new Date('2024-05-07'));

    const chartData = infectionData
        .filter(data => new Date(data.infectionDate) >= startDate && new Date(data.infectionDate) <= endDate)
        .map(data => ({
            date: data.infectionDate,
            infected: data.active ? 1 : 0,
        }));

    return (
        <>
            <h2 className="text-center mb-4">Nombre d'Infections par Date</h2>
            <p className="text-center">Ce graphique montre le nombre de personnes infectées par votre malware chaque jour sur une période de temps spécifiée.</p>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group controlId="startDate">
                        <Form.Label>Date de début</Form.Label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="endDate">
                        <Form.Label>Date de fin</Form.Label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="infected" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default InfectionChart;
