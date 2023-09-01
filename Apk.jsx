import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Install Axios if not already installed

function RecordList() {
    const [records, setRecords] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [newRecord, setNewRecord] = useState({ name: '', active: false });

    useEffect(() => {
        // Fetch records from the backend when the component mounts
        axios.get('http://localhost:3001/api/records') // Replace with your backend server URL
            .then((response) => {
                setRecords(response.data);
            })
            .catch((error) => {
                console.error('Error fetching records:', error);
            });
    }, []);

    // ... Other code for filtering, deleting, and inserting records ...

    const handleInsertRecord = () => {
        // Send a POST request to add the new record to the backend
        axios.post('http://localhost:3001/api/records', newRecord) // Replace with your backend server URL
            .then(() => {
                // After successful insertion, fetch updated records from the backend
                axios.get('http://localhost:3001/api/records')
                    .then((response) => {
                        setRecords(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching records:', error);
                    });
            })
            .catch((error) => {
                console.error('Error inserting record:', error);
            });
        
        // Clear the input fields after insertion
        setNewRecord({ name: '', active: false });
    };

    // ... Rest of the component ...

    return (
        // ... JSX for the component ...
    );
}

export default RecordList;
