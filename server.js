import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Html from './src/helpers/Html'

var app = express();
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 4000));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Server-side and client-side rendering of comments
app.get('/', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    data = data ? JSON.parse(data) : [];
    var containerData = {
      data: data,
      url: '/api/comments',
      pollInterval: 5000
    };
    var html = ReactDOMServer.renderToStaticMarkup(<Html containerData={containerData} />);

    res.end(html);
  });
});

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    data = data ? JSON.parse(data) : [];
    res.setHeader('Cache-Control', 'no-cache');
    res.json(data);
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    var comments = data ? JSON.parse(data) : [];
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
