import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RegionBarChart = ({ infectionData }) => {
    // Define all regions and their initial counts
    const regions = [
        'North America', 'South America', 'Europe', 'Asia', 'Africa', 'Australia',
        'Antarctica', 'Central America', 'Middle East', 'Caribbean'
    ];

    // Initialize region counts
    const regionCounts = regions.reduce((acc, region) => {
        acc[region] = 0;
        return acc;
    }, {});

    // Calculate the number of infections per region
    infectionData.forEach(data => {
        if (regionCounts[data.region] !== undefined) {
            regionCounts[data.region] += 1;
        }
    });

    // Convert the data to chart format
    const chartData = Object.keys(regionCounts).map(region => ({
        region,
        Nombre: regionCounts[region],
    }));

    return (
        <>
            <h2 className="text-center">Infections par Région</h2>
            <p className="text-center">Ce graphique montre le nombre d'infections par région, permettant de visualiser la répartition géographique des infections.</p>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Nombre" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default RegionBarChart;
