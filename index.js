const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
// POST method route
app.post('/api', (request, response) => {
    console.log('I got a request');
    console.log(request.body);
    const data = request.body;
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    });
})

const mysql = require('mysql');
const fs = require('fs');
var con = mysql.createConnection({
  host: "34.89.35.185",
  user: "root",
  password: "FCG43df123",
  database: "sensordata",
     ssl: {
        ca: fs.readFileSync(__dirname + '/certs/server-ca.pem'),
        key: fs.readFileSync(__dirname + '/certs/client-key.pem'),
        cert: fs.readFileSync(__dirname + '/certs/client-cert.pem')
     }
});

// app.get('/', request)
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM light_data \n " + 
            "Limit 3",
    function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});