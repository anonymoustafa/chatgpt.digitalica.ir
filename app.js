const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a new record
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.run(query, [name, email], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get all records
app.get('/users', (req, res) => {
    const query = `SELECT * FROM users`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Get a single record by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(row);
    });
});

// Update a record by ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    db.run(query, [name, email, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ updated: this.changes });
    });
});

// Delete a record by ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM users WHERE id = ?`;
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ deleted: this.changes });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
