/*
restful service node js
author:bonaxcrimo@gmail.com
update:10-02-2019
*/
let express = require('express');
let mysql = require('mysql');
let bodyParser = require('body-parser');
//connect to mysql
let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 8889,
  password: 'root',
  database: 'manga'
});
con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});
let app = express();
let publicDir = __dirname + '/public/';
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get all banner
app.get('/banner', (req, res, next) => {
  con.query('select * from banner', (error, result, field) => {
    con.on('error', err => {
      console.log('[mysql error]', err);
    });
    if (result && result.length) {
      res.end(JSON.stringify(result));
    } else {
      res.end(JSON.stringify('no banner here'));
    }
  });
});

//get all comic
app.get('/comic', (req, res, next) => {
  con.query('select * from manga', (error, result, field) => {
    con.on('error', err => {
      console.log('[mysql error]', err);
    });
    if (result && result.length) {
      res.end(JSON.stringify(result));
    } else {
      res.end(JSON.stringify('no comic here'));
    }
  });
});

//get chapter
app.get('/chapter/:mangaid', (req, res, next) => {
  con.query(
    'select * from chapter where MangaID=?',
    [req.params.mangaid],
    (error, result, field) => {
      con.on('error', err => {
        console.log('[mysql error]', err);
      });
      if (result && result.length) {
        res.end(JSON.stringify(result));
      } else {
        res.end(JSON.stringify('no chapter here'));
      }
    }
  );
});

//get images by chapter
app.get('/link/:chapterid', (req, res, next) => {
  con.query(
    'select * from link where ChapterId=?',
    [req.params.chapterid],
    (error, result, field) => {
      con.on('error', err => {
        console.log('[mysql error]', err);
      });
      if (result && result.length) {
        res.end(JSON.stringify(result));
      } else {
        res.end(JSON.stringify('no image here'));
      }
    }
  );
});

//server
app.listen(3000, () => {
  console.log('listen in port 3000');
});
