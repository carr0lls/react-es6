var fs = require('fs');
var data = require('./seed-data')
var COMMENTS_FILE = 'comments.json';

fs.writeFile(COMMENTS_FILE, JSON.stringify(data.comments, null, 4));
