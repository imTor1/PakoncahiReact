const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123_321",
    database: "shopdee"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/api/register', function(req, res){  
    const { username, password, firstName, lastName } = req.body;
    const sql = `INSERT INTO customer (username, password, 
                firstName, lastName) VALUES (?, ?, ?, ?)`;
    
    db.query(sql, [username, password, firstName, lastName], 
        function(err, result){
            if (err) {
                res.status(500).send({message: 'Error registering', status: false});
            } else {
                res.send({'message':'Registration successful', 'status':true});
            }
        }
    )
});

app.post('/api/login', function(req, res) {
    const { username, password } = req.body;
    const sql = `SELECT * FROM customer WHERE username = ? AND password = ?`;

    db.query(sql, [username, password], function(err, result) {
        if (err) {
            res.status(500).send({message: 'Error during login', status: false});
        } else if (result.length > 0) {
            res.send({message: 'Login successful', status: true});
        } else {
            res.send({message: 'Invalid credentials', status: false});
        }
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});
