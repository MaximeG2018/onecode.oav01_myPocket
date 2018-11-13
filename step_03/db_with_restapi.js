
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

db.connect((err) => {

  if (err){
    console.log(err.message);
  }else {
    console.log('Connected');

    db.query('SELECT * FROM users', (err, result) => {
      if(err){
        console.log(err.message);
      }else {
        app.use ((req, res, next) => {
          console.log('URL : ' + req.url);
          next();
        })

        //  /users/:userId/links ==> GET

        app.get('/users/:userId/links', (req, res) => {
          let id = Object.values(req.params);
          db.query('SELECT * FROM users WHERE Id_user = ?', [id], (err, result) => {
            if (err) {
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

        // /users/:userId/links/:id ==> GET

        app.get('/users/:userId/links/:id', (req, res) => {
          let id = Object.values(req.params);
          db.query('SELECT * FROM users WHERE Id_user = ?', [id[1]], (err,result) =>{
            if (err){
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

        // /users/:userId/links ==> DELETE

        app.delete('/users/:userId/links', (req, res) => {
          let id = Object.values(req.params);
          db.query('DELETE FROM users WHERE Id_user = ?', [id], (err,result) =>{
            if (err){
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

        // /users/:userId/links/:id ==> DELETE

        app.delete('/users/:userId/links/:id', (req, res) => {
          let id = Object.values(req.params);
          db.query('DELETE FROM users WHERE Id_user = ?', [id[1]], (err,result) =>{
            if (err){
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

        // /users/:userId/links ==> POST

        app.post('/users/:userId/links', (req, res) => {

          db.query('INSERT INTO users(Nickname_user, Email_user, Password_user) VALUES ("test","test","test")', (err,result) =>{
            if (err){
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

        // /users/:userId/links/:id ==> POST

        app.post('/users/:userId/links/:id', (req, res) => {

          db.query('INSERT INTO users(Nickname_user, Email_user, Password_user) VALUES ("test","test","test")', (err,result) =>{
            if (err){
              res.json(error(err.message))
            }else {
              res.json(success(result))
            }
          })
        })

    // /users/:userId/links ==> PUT

    app.put('/users/:userId/links', (req, res) => {
      let id = Object.values(req.params);
      db.query('UPDATE users SET Nickname_user = "jack", Email_user = "EmailJack", Password_user = "PwdJack" WHERE Id_user = ?', [id], (err,result) => {
        if (err){
          res.json(error(err.message))
        }else {
          res.json(success(result))
        }
      })
    })

    // /users/:userId/links/:id ==> PUT

    app.put('/users/:userId/links/:id', (req, res) => {
      let id = Object.values(req.params);
      db.query('UPDATE users SET Nickname_user = "jack", Email_user = "EmailJack", Password_user = "PwdJack" WHERE Id_user = ?', [id[1]], (err,result) => {
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
