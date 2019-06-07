var express = require("express");
var app = express();
var prediction_script_router = require("./routes/predict");
var cors = require("cors");
var path = require("path");

app.listen(3000, () => {
 console.log("Server running on port 3000");
});


app.use(function (req, res, next) {
  console.log("Handling " + req.path + '/' + req.method);
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", ["Content-Type", "application/JSON", "Location", "multipart/form-data"]);
  res.header("Access-Control-Expose-Headers", ["Location"]);
  res.header("Access-Control-Allow-Methods", ["DELETE", "PUT", "GET"]);
  next();
});
app.use(cors());
app.use(express.json());
app.use("/predictor", prediction_script_router);

module.exports = app;

