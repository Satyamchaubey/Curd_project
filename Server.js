const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Choose a port for your server

app.use(bodyParser.json());

// In-memory data store for records
let records = [
    { name: "Record 1", active: true },
    { name: "Record 2", active: false },
    { name: "Record 3", active: true },
    // Add more records here
];

// Enable CORS to allow requests from your React app
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your React app's origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// API endpoint to get all records
app.get('/api/records', (req, res) => {
    res.json(records);
});

// API endpoint to add a new record
app.post('/api/records', (req, res) => {
    const newRecord = req.body;
    records.push(newRecord);
    res.json({ message: 'Record added successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
