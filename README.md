# React Tutorial (in ES6)

This is the React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html) but rewritten in ES6 using Babel as a transpiler and webpack to manage client-side modules.

## To use

```sh
npm install

// Transpile ES6 to ES5 and build public files
babel src --out-dir public/js (Add --watch flag for continuous dev build)

// Bundle scripts
webpack public/js/app.js public/js/bundle.js (Add --watch flag for continuous dev build)
```

### Run Server

There are several simple server implementations included. They all serve static files from `public/` and handle requests to `/api/comments` to fetch or add data. Start a server with one of the following:

#### Node

```sh
node server.js
```

#### PHP
```sh
php server.php
```

And visit <http://localhost:4000/>. Try opening multiple tabs!

### Run Server
```sh
// Reload dummy data/comments
node seed.js
```

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)