// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const  date  = req.params.date || '';

  // Date regex
  const validDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  let timestamp;
  let unix;

  if (!date) {
    timestamp = new Date();
    unix = Math.floor(timestamp.getTime());
  } else if (!isNaN(date)) {
    const unixTimeString = Number(date);
    timestamp = new Date(unixTimeString);
    unix = unixTimeString;

  }  else if (new Date(date)) {
    timestamp = new Date(date);
    unix = Number(Math.floor(timestamp.getTime()));
  } else {
    // Handle invalid Unix timestamp format
    return res.status(400).json({ error: "Invalid Date" });
  }


  if (!isNaN(timestamp.getTime())) {
    return res.json({ unix:unix, utc:timestamp.toUTCString()})
  } else {
    return res.status(400).json({ error: "Invalid Date" });
  } 
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
