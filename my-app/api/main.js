var express = require("express");
var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

var ps = require("python-shell");
var username = "";
var result = -1;

app.get("/Predictor", run_prediction_script);

function run_prediction_script(req, res) {
  var options = {
    args: [req.query.username]
  }
  
  if (req.query.username) {
    console.log("getting result");
    ps.PythonShell.run('./Predictor.py', options, function (err, data) { 
      if (err) {
        console.log(err);
        console.log("error occurs\n");
      } else {
        console.log("result: " + data.toString());
        res.send(data.toString());
      }
    });
  } else {
    console.log("Waiting for username\n");
  }
}


