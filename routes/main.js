var express = require('express');
var router = express.Router();

const mysql = require('mysql2');

const fs = require('fs');
const yaml = require('js-yaml');
const filePath = '.env.yml';

const fileContents = fs.readFileSync(filePath, 'utf8');
const data = yaml.load(fileContents);

// MariaDB 
const connection = mysql.createConnection({
  host: data['host'],
  port: data['port'],
  user: data['user'],
  password: data['password'],
  database: data['database']
});


module.exports = router;

router.get('/', function(req, res, next) {

  //get users, users_data
  connection.query('SELECT * FROM users_data', (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr);
      return;
    }

    const users_data = JSON.stringify(results);

    connection.query('SELECT * FROM users', (queryErr, results) => {
      if (queryErr) {
        console.error('Error executing query:', queryErr);
        return;
      }
  
      const users = JSON.stringify(results);
      
      res.render('main.html',{users_data:users_data,users:users});

    });

    
  });
  
});

