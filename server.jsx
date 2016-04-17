import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import exphbr from 'express-handlebars'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Html from './dist/helpers/Html'

var app = express();
var handlebars = exphbr.create({extname: '.html'});
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 4000));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('html', handlebars.engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Client-side rendering (only) of comments
app.get('/', function(req, res) {
  res.render('index');
});

// Server-side and client-side rendering of comments
app.get('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    var containerData = {
      data: JSON.parse(data),
      url: '/api/comments',
      pollInterval: 5000
    };
    var html = ReactDOMServer.renderToStaticMarkup(<Html containerData={containerData} />);

    res.end(html);
  });
});

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
