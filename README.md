# React Tutorial (in ES6)

This is the React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html) but rewritten in ES6 using Babel as a transpiler and webpack to manage client-side modules.

## To run

```sh
npm install

// Transpile server and client-side files from ES6 to ES5 and bundle scripts
npm run build

// Start server
npm start
```

And visit <http://localhost:4000/>. Try opening multiple tabs!

## To run in dev-mode

```sh
npm install

// Watch and transpile client-side files from ES6 to ES5
npm run watch-client

// Watch and transpile server file from ES6 to ES5
npm run watch-server

// Watch and bundle scripts
npm run watch-scripts

// Watch and start server
npm run watch-start
```

### Reset Database
```sh
// Reload dummy data/comments
npm run reset-db
```

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
