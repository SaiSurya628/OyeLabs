const mysql = require('mysql');

const customers = [
  { email: "anurag11@yopmail.com", name: "anurag" },
  { email: "sameer11@yopmail.com", name: "sameer" },
  { email: "ravi11@yopmail.com", name: "ravi" },
  { email: "akash11@yopmail.com", name: "akash" },
  { email: "anjali11@yopmail.com", name: "anjai" },
  { email: "santosh11@yopmail.com", name: "santosh" }
];

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database'
});

connection.connect();

for (const customer of customers) {
  connection.query(
    'INSERT INTO customers (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)',
    [ customer.name,customer.email],
    (error, results) => {
      if (error) throw error;
      console.log('Customer inserted or updated:', customer.email);
    }
  );
}

connection.end();
