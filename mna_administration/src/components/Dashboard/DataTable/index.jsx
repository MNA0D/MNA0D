import React, { useState } from 'react';
import { Table, Form, InputGroup, FormControl, Button, Pagination, Dropdown } from 'react-bootstrap';

function DataTable({ infectionData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: 'lastActivity', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (number) => {
        setItemsPerPage(number);
        setCurrentPage(1); // Reset to the first page
    };

    const sortedData = [...infectionData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredData = sortedData.filter(data => {
        if (filter !== 'All') {
            const isActive = filter === 'Active';
            if (data.active !== isActive) {
                return false;
            }
        }
        return (
            data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.region.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
            <h2 className="text-center mb-4">Tableau des Infections</h2>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Rechercher..."
                    aria-label="Rechercher"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Form.Select aria-label="Filtrer" value={filter} onChange={handleFilterChange}>
                    <option value="All">Tous</option>
                    <option value="Active">Actifs</option>
                    <option value="Inactive">Inactifs</option>
                </Form.Select>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {itemsPerPage} par page
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleItemsPerPageChange(30)}>30</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleItemsPerPageChange(50)}>50</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleItemsPerPageChange(100)}>100</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </InputGroup>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <Button variant="link" onClick={() => handleSort('name')}>
                                Nom {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </Button>
                        </th>
                        <th>IP</th>
                        <th>Région</th>
                        <th>Actif</th>
                        <th>
                            <Button variant="link" onClick={() => handleSort('lastActivity')}>
                                Dernière Activité {sortConfig.key === 'lastActivity' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </Button>
                        </th>
                        <th>
                            <Button variant="link" onClick={() => handleSort('infectionDate')}>
                                Date d'Infection {sortConfig.key === 'infectionDate' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((data, index) => (
                        <tr key={index} style={{ backgroundColor: data.active ? 'white' : 'lightgrey' }}>
                            <td>{data.name}</td>
                            <td>{data.ip}</td>
                            <td>{data.region}</td>
                            <td>{data.active ? 'Oui' : 'Non'}</td>
                            <td>{data.lastActivity}</td>
                            <td>{data.infectionDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
}

export default DataTable;
