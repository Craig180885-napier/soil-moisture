const express = require("express");
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.static("graphe"));
app.use(express.json({ limit: "1mb" }));

const mysql = require("mysql");
const fs = require("fs");
var con = mysql.createConnection({
  host: "34.89.35.185",
  user: "Craig",
  password: "Password",
  database: "sensordata",
  ssl: {
    ca: fs.readFileSync(__dirname + "/certs/server-ca.pem"),
    key: fs.readFileSync(__dirname + "/certs/client-key.pem"),
    cert: fs.readFileSync(__dirname + "/certs/client-cert.pem"),
  },
});

con.connect(function (err) {
  if (err) throw err;
});

app.get("/soil", (request, response) => {
  con.query(
    "SELECT data, published_at FROM light_data \n " +
      "Order by published_at DESC \n" +
      "Limit 50 ",

    function (err, result, fields) {
      if (err) throw err;
      // var num = 0;
  
      // result.forEach((element) => {
      //   moistureReadings.push(parseFloat(result[num].data));
      //   dateTimePublished.push(result[num].published_at);

      //   num++;
      // });
      // console.log("array 1: ", result);
      response.json({ result });
    }
  );   
});

