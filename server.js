'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _containers = require('./public/js/containers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(),
    handlebars;
var COMMENTS_FILE = _path2.default.join(__dirname, 'comments.json');

app.set('port', process.env.PORT || 4000);

app.use('/', _express2.default.static(_path2.default.join(__dirname, 'public')));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

handlebars = _expressHandlebars2.default.create({ extname: '.html' });
app.engine('html', handlebars.engine);
app.set('view engine', 'html');
app.set('views', _path2.default.join(__dirname, 'views'));

// Client-side rendering (only) of comments
app.get('/', function (req, res) {
  res.render('index');
});

// Server-side and client-side rendering of comments
app.get('/comments', function (req, res) {
  res.setHeader('Content-Type', 'text/html');

  var props = {
    url: '/api/comments',
    pollInterval: 3000
  };

  var html = _server2.default.renderToStaticMarkup(_react2.default.createElement(
    'body',
    null,
    _react2.default.createElement(
      'h1',
      null,
      'COMMENTS (server and client-side rendering)'
    ),
    _react2.default.createElement('div', { id: 'content', dangerouslySetInnerHTML: { __html: _server2.default.renderToString(_react2.default.createElement(_containers.CommentBox, { url: props.url, pollInterval: props.pollInterval }))
      } }),
    _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: 'var APP_PROPS = ' + JSON.stringify(props) + ';'
      } }),
    _react2.default.createElement('script', { src: 'js/bundle.js' })
  ));
  res.end(html);
});

app.get('/api/comments', function (req, res) {
  _fs2.default.readFile(COMMENTS_FILE, function (err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function (req, res) {
  _fs2.default.readFile(COMMENTS_FILE, function (err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    _fs2.default.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
