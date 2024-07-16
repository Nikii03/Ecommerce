const express = require('express');
const app = express();
const mysql=require('mysql2');
app.use(express.json());


const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sam',
    password:'niki123'
  });

  // Create
app.post('/create', (req, res) => {
  const { name, age } = req.body;
  const sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
  connection.query(sql, [name, age], (err, result) => {
      if (err) throw err;
      res.send('User added...');
  });
});

// Read all
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

// Read one
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});

// Update
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const sql = 'UPDATE users SET name = ?, age = ? WHERE id = ?';
  connection.query(sql, [name, age, id], (err, result) => {
      if (err) throw err;
      res.send('User updated...');
  });
});

// Delete
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send('User deleted...');
  });
});


  

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
    
});



