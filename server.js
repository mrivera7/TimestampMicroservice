var express = require('express');
var app = express();
var _ = require('lodash');

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  (req.params.date_string === 'undefined' ? 
       (() => {
          let date = new Date();
          res.json({ "unix": date.getTime(), "utc" : date.toUTCString() });
          })()
     : (req.params.date_string.includes('-') ? 
          (() => {
            let inputDate = _.split(req.params.date_string, '-');
            let date = new Date(inputDate[0], Number(inputDate[1]) - 1, inputDate[2]);
            res.json({ "unix": date.getTime(), "utc" : date.toUTCString() });
          })() : (new Date(Number(req.params.date_string)) == 'Invalid Date' ? 
                   res.json({ "error": "Invalid Date" }) :
                   (() => {
                      let date = new Date(Number(req.params.date_string));
                      res.json({ "unix": date.getTime(), "utc" : date.toUTCString() });
                    })()
                 )
          )
    );  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});