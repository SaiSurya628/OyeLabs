const mysql = require('mysql');
const express = require('express');
const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your-password',
  database: 'your-database',
});

// Connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});

// API endpoint for adding a customer
app.post('/addCustomer', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required fields.' });
  }

  // Check if the customer with the same email already exists
  const checkQuery = 'SELECT * FROM customers WHERE email = ?';
  connection.query(checkQuery, [email], (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      return res.status(500).json({ error: 'An error occurred while adding the customer.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Customer with the same email already exists.' });
    }

    // Insert the new customer into the database
    const insertQuery = 'INSERT INTO customers (name, email) VALUES (?, ?)';
    connection.query(insertQuery, [name, email], (error, result) => {
      if (error) {
        console.error('Error inserting the customer into the database:', error);
        return res.status(500).json({ error: 'An error occurred while adding the customer.' });
      }

      const newCustomerId = result.insertId;
      console.log(`New customer added: ${name} (${email}) with customerId ${newCustomerId}`);

      return res.status(201).json({ message: 'Customer added successfully.', customerId: newCustomerId });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
