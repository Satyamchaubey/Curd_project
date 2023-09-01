import React, { useState } from 'react';

function RecordList() {
    const initialRecords = [
        { name: "Record 1", active: true },
        { name: "Record 2", active: false },
        { name: "Record 3", active: true },
        // Add more records here
    ];

    const [records, setRecords] = useState(initialRecords);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [newRecord, setNewRecord] = useState({ name: '', active: false }); // New record input state

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleDeleteSelected = () => {
        const selectedRecords = records.filter((record) =>
            document.getElementById(record.name).checked
        );
        const updatedRecords = records.filter((record) =>
            !selectedRecords.map((selected) => selected.name).includes(record.name)
        );
        setRecords(updatedRecords);
    };

    const handleInsertRecord = () => {
        if (newRecord.name.trim() === '') {
            alert('Please enter a valid name for the new record.');
            return;
        }
        setRecords([...records, newRecord]);
        setNewRecord({ name: '', active: false }); // Clear the input fields after insertion
    };

    const filteredRecords = records.filter((record) => {
        if (filter === 'all' || (filter === 'active' && record.active) || (filter === 'inactive' && !record.active)) {
            return record.name.toLowerCase().includes(search.toLowerCase());
        }
        return false;
    });

    return (
        <div className="record-list">
            <label htmlFor="filter">Filter:</label>
            <select id="filter" onChange={handleFilterChange} value={filter}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>

            <label htmlFor="search">Search:</label>
            <input
                type="text"
                id="search"
                placeholder="Search by name"
                value={search}
                onChange={handleSearchChange}
            />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map((record) => (
                        <tr key={record.name}>
                            <td>{record.name}</td>
                            <td>{record.active ? 'Active' : 'Inactive'}</td>
                            <td>
                                <input type="checkbox" id={record.name} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <label htmlFor="newName">New Record Name:</label>
                <input
                    type="text"
                    id="newName"
                    value={newRecord.name}
                    onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                />

                <label htmlFor="newActive">Active:</label>
                <input
                    type="checkbox"
                    id="newActive"
                    checked={newRecord.active}
                    onChange={(e) => setNewRecord({ ...newRecord, active: e.target.checked })}
                />

                <button onClick={handleInsertRecord}>Insert Record</button>
            </div>

            <button onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
    );
}

export default RecordList;
