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

/* GET home page. */
router.get('/', function(req, res, next) {
  //get users data, for check the new register
  connection.query('SELECT * FROM users', (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr);
      return;
    }
  
  const resultsString = JSON.stringify(results);
  
  res.render('index.html',{users:resultsString});
  //connection.end()
  });
  
});

router.get('/getData', function(req, res, next) {
  connection.query('SELECT * FROM users_data', (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr);
      return;
    }
  
  const resultsString = JSON.stringify(results);

  res.json(resultsString);
  //connection.end()
  });
  
});

router.get('/getInfo', function(req, res, next) {
  connection.query('SELECT * FROM users', (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr);
      return;
    }
  
  const resultsString = JSON.stringify(results);

  res.json(resultsString);
  //connection.end()
  });
  
});



router.get('/getcodeData', function(req, res, next) {
  connection.query('SELECT * FROM code_data', (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr);
      return;
    }
  
  const resultsString = JSON.stringify(results);

  res.json(resultsString);
  //connection.end()
  });
  
});


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/', (req, res) => {
  const getIdQuery = 'SELECT MAX(id) AS maxId FROM users'
  
  
  connection.query(getIdQuery, (error, results, fields) => {
    if (error) throw error;


    const id = results[0].maxId + 1;
    const username = req.body.username; 
    const email = req.body.email; 
    const password = req.body.password; 
    const created_at = new Date();
    console.log(id,username,email,password,created_at)

    const dataToInsert = { id: id, username: username, email: email, password: password, created_at: created_at };
    const user_query = 'INSERT INTO users SET ?';
    
    connection.query(user_query, dataToInsert, (error, results, fields) => {
        if (error) throw error;
        console.log('success');
        const values = Array.from({ length: 1 }, (_, index) => id + index);
        const userdata_query = `INSERT INTO users_data (id) VALUES (${values.join(', ')})`;
        connection.query(userdata_query, (error, results, fields) => {
            if(error){
              console.log(error)
            }
            console.log('success');
        });
    });

    



    res.send('success');

    });

  

});

router.post('/cal', (req, res) => {
  const userindex = req.body.userindex + 1; 
  const date = req.body.date; 
  const contents = req.body.contents; 

  const UpdateQuery = 'UPDATE users_data SET ?? = ? WHERE id = ?';
  const queryParams = [date, contents, userindex];

  connection.query(UpdateQuery, queryParams, (error, results, fields) => {
    if (error) {
      
      return;
    }

    console.log('success');
    res.send('success');
  });

  

});


router.post('/suggestion', (req, res) => {
  const userindex = req.body.userindex; 
  const suggestions = req.body.suggestions; 

  const UpdateQuery = 'UPDATE users SET suggestions = ? WHERE id = ?';
  const queryParams = [suggestions, userindex];

  connection.query(UpdateQuery, queryParams, (error, results, fields) => {
    if (error) {
      
      return;
    }

    console.log('success');
    res.send('success');
  });

  

});

router.post('/insertcode', (req, res) => {
  const getIdQuery = 'SELECT MAX(id) AS maxId FROM code_data'
  
  
  connection.query(getIdQuery, (error, results, fields) => {
    if (error) throw error;

    const id = results[0].maxId + 1;
    const user_id = parseInt(req.body.user_id) + 1; 
    const pattern_num = req.body.pattern_num;
    const before_code = req.body.before_code; 
    const before_code_time = req.body.before_code_time; 
    const before_code_cpu = req.body.before_code_cpu; 
    const before_code_mem = req.body.before_code_mem; 
    const after_code = req.body.after_code; 
    const after_code_time = req.body.after_code_time; 
    const after_code_cpu = req.body.after_code_cpu; 
    const after_code_mem = req.body.after_code_mem; 
    const created_at = new Date();


    const dataToInsert = { id: id, user_id: user_id, pattern_num: pattern_num, before_code: before_code, before_code_time: before_code_time, before_code_cpu: before_code_cpu, before_code_mem: before_code_mem, after_code: after_code, after_code_time: after_code_time, after_code_cpu: after_code_cpu, after_code_mem: after_code_mem, created_at: created_at };
    const user_query = 'INSERT INTO code_data SET ?';
    
    connection.query(user_query, dataToInsert, (error, results, fields) => {
        if (error) throw error;
        console.log('success');
        
    });

    



    res.send('success');

    });

  

});

router.post('/info', (req, res) => {
  const userindex = parseInt(req.body.userindex) + 1; 
  const job = req.body.job; 
  const age = req.body.age;
  const gender = req.body.gender; 

  const UpdateQuery = 'UPDATE users SET job = ?, age = ?, gender = ? WHERE id = ?';
  const queryParams = [job, age, gender, userindex];

  console.log(job, age, gender, userindex)
  connection.query(UpdateQuery, queryParams, (error, results, fields) => {
    if (error) {
      return;
    }

    console.log('success');
    res.send('success');
  });
});

