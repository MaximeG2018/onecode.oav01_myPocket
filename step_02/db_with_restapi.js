
require ('babel-register');

const express = require('express');
const app = express();

const mysql = require('mysql');
const bodyParser = require('body-parser')

const db = mysql.createConnection({
  host: 'localhost',
  database: 'nodejs',
  user: 'root',
  password: 'root',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})


db.connect((err) => {

  if (err){
    console.log(err.message);
  }else {
    console.log('Connected');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));

    db.query('SELECT * FROM users', (err, result) => {
      if(err){
        console.log(err.message);
      }else {
        app.use ((req, res, next) => {
          console.log('URL : ' + req.url);
          next();
        })

        //  User ==> GET

        app.get('/users', (req, res) => {
          db.query('SELECT * FROM users', (err, result) => {
            if (err) {
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

        // User/:id ==> GET

        app.get('/users/:id', (req, res) => {
          let id = Object.values(req.params);
          db.query('SELECT *  FROM users WHERE Id_user = ?', [id], (err,result) =>{
            if (err){
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

        // User ==> DELETE

        app.delete('/users/', (req, res) => {
          let id = Object.values(req.params);
          db.query('DELETE FROM users', (err,result) =>{
            if (err){
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

        // User/:id ==> DELETE

        app.delete('/users/:id', (req, res) => {
          let id = Object.values(req.params);
          db.query('DELETE FROM users WHERE Id_user = ?', [id], (err,result) =>{
            if (err){
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

        // User ==> POST

        app.post('/users/', (req, res) => {
          db.query('INSERT INTO users(Nickname_user, Email_user, Password_user) VALUES ("test","test","test")', (err,result) =>{
            if (err){
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

    // User/:id ==> PUT

    app.put('/users/:id', (req, res) => {
      let id = Object.values(req.params);
      db.query('UPDATE users SET Nickname_user = "jack", Email_user = "EmailJack", Password_user = "PwdJack" WHERE Id_user = ?', [id], (err,result) => {
        if (err){
          res.json(error(err.message))
        }else {
          res.json(success(result))
        }
      })
    })

        app.listen(3000, () => console.log('Started on port 3000'));

        console.log("Submit GET or POST to http://localhost:3000/users");
      }
    })
  }

})

function success(result){
  return {
    status: 'success',
    result: result
  }
}

function error(message){
  return {
    status: 'error',
    message: message
  }
}
