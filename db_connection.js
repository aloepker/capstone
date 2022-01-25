var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "passwordA1!"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //con.query(sql, function (err, result) {  //added query
  //  if (err) throw err;
 //   console.log("Result: " + result);
 // });
});