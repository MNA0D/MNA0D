import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function DataFilter({ onFilterChange }) {
    const [region, setRegion] = useState('All');

    const handleRegionChange = (e) => {
        setRegion(e.target.value);
        onFilterChange(e.target.value);
    };

    return (
        <>
            <h2 className="text-center mb-4">Filtrer par Région</h2>
            <Form>
                <Form.Group controlId="formRegionSelect">
                    <Form.Label>Sélectionner une région</Form.Label>
                    <Form.Control as="select" value={region} onChange={handleRegionChange}>
                        <option value="All">Toutes</option>
                        <option value="North America">Amérique du Nord</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asie</option>
                        {/* Ajoutez plus d'options de région ici */}
                    </Form.Control>
                </Form.Group>
            </Form>
        </>
    );
}

export default DataFilter;
