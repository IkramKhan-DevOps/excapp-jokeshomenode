const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static("express"));
var sqlite3 = require('sqlite3').verbose()
var db = require("./database.js")

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
});

app.get('/json/get/joke', (req, res) => {
  
    var sql = "SELECT * FROM application_joke ORDER BY RANDOM() LIMIT 1"
    db.get(sql, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
})


const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);