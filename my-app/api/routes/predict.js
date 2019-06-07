var express = require("express");
var router = express.Router();
var ps = require("python-shell");

router.get("/", function(req, res) {
    console.log("req body " + req.query);
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
            res.send({pred: parseInt(data.toString())});
        }
        });
    } else {
        console.log("Waiting for username\n");
    }
});
    
module.exports = router;
