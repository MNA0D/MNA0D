import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './custom-marker.css';

// Définir les coordonnées des régions
const regionCoordinates = {
    'North America': [40.7128, -74.0060], // New York
    'South America': [-23.5505, -46.6333], // São Paulo
    'Europe': [48.8566, 2.3522], // Paris
    'Asia': [35.6895, 139.6917], // Tokyo
    'Africa': [-1.2921, 36.8219], // Nairobi
    'Australia': [-33.8688, 151.2093], // Sydney
    'Antarctica': [-75.250973, -0.071389], // Antarctica
    'Central America': [9.9281, -84.0907], // San José
    'Middle East': [24.7136, 46.6753], // Riyadh
    'Caribbean': [18.1096, -77.2975], // Kingston
};

// Créer une icône personnalisée en utilisant DivIcon
const customIcon = new L.DivIcon({
    className: 'custom-icon',
    html: '<i class="fas fa-map-marker-alt"></i>',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -40],
});

function InfectionMap({ infectionData }) {
    return (
        <>
            <h2 className="text-center mb-4">Carte des Infections</h2>
            <p className="text-center">Cette carte montre les régions touchées par votre malware et les détails des infections dans chaque région.</p>
            <MapContainer center={[20, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {Object.keys(regionCoordinates).map(region => (
                    <Marker key={region} position={regionCoordinates[region]} icon={customIcon}>
                        <Popup>
                            <h5>{region}</h5>
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {infectionData.filter(data => data.region === region).map((data, index) => (
                                        <li key={index} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
                                            <strong>{data.name}</strong><br />
                                            IP: {data.ip}<br />
                                            Actif: {data.active ? 'Oui' : 'Non'}<br />
                                            Dernière Activité: {data.lastActivity}<br />
                                            Date d'Infection: {data.infectionDate}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    );
}

export default InfectionMap;
