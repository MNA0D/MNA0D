import React, { useState } from 'react';
import { Table, Form, InputGroup, FormControl, Button, Pagination, Dropdown } from 'react-bootstrap';

function ToastDataTable({ toastData }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
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

    const sortedData = [...toastData].sort((a, b) => {
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
            if (data.type !== filter) {
                return false;
            }
        }
        return (
            data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
            <h2 className="text-center mb-4">Tableau des Notifications</h2>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Rechercher..."
                    aria-label="Rechercher"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Form.Select aria-label="Filtrer" value={filter} onChange={handleFilterChange}>
                    <option value="All">Tous</option>
                    <option value="Info">Info</option>
                    <option value="Warning">Warning</option>
                    <option value="Error">Error</option>
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
                            <Button variant="link" onClick={() => handleSort('title')}>
                                Titre {sortConfig.key === 'title' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </Button>
                        </th>
                        <th>Message</th>
                        <th>
                            <Button variant="link" onClick={() => handleSort('type')}>
                                Type {sortConfig.key === 'type' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </Button>
                        </th>
                        <th>
                            <Button variant="link" onClick={() => handleSort('date')}>
                                Date {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((data, index) => (
                        <tr key={index} style={{ backgroundColor: data.background }}>
                            <td>{data.title}</td>
                            <td>{data.message}</td>
                            <td>{data.type}</td>
                            <td>{data.date}</td>
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

export default ToastDataTable;
