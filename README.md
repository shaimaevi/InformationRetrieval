[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# search-engine 

CMSC 191 search engine client

## Prerequisites

- nodejs
- mysql client

## Development

- clone this repo and cd to InformationRetrieval

      git clone https://github.com/shaimaevi/InformationRetrieval.git
      cd InformationRetrieval

- create a `.env` file

      // .env

      # ==================================
      #              APP
      # ==================================

      PORT=3000

      MYSQL_HOST=localhost
      MYSQL_USER=root
      MYSQL_PASS=<your password here>
      MYSQL_DATABASE=ir-mysql

      # ==================================
      #           DEV MODE
      # ==================================

      SERVE_DOCS=true

      # Proxy
      PROXY_HOST=0.0.0.0
      PROXY_PORT=9090

      # ==================================
      #          DEBUG MODULES
      # ==================================

      DEBUG=server,api*


- run

      npm install
      npm run dev:server
      npm run dev:client

### **Env**

#### Required
- `PORT` - port used, defaults to `3000`
- `MYSQL_HOST` - mysql db host, defaults to `localhost`
- `MYSQL_USER` - mysql db user, defaults to `root`
- `MYSQL_PASS` - mysql db password
- `MYSQL_DATABASE` - mysql db to use
#### For scripts
- `RETRIEVE_MONGO_URI` - retrieval mongodb database uri
- `IP` - used by browser sync

#### For dev
- `SERVE_DOCS` - server documentation routes, enable `graphiql`
- `PROXY_URL` - will be used by `webpack-dev-server`
- `PROXY_PORT` - will be used by `webpack-dev-server`
- `HOST` - will be used webpack
- `DEBUG` - will be used to debug by module


## Tests

```sh
npm install
npm test
```
```

> search-engine@1.0.0 test /home/metsys/DATA/projects/javascript/search-engine
> run-s test:lint test:unit
> search-engine@1.0.0 test:lint /home/metsys/DATA/projects/javascript/search-engine
> run-s client:test:unit server:test:unit
> search-engine@1.0.0 client:test:unit /home/metsys/DATA/projects/javascript/search-engine
> babel-tape-runner src/client/**/*.spec.js | faucet
not ok 1 no plan found
not ok 2 no assertions found
⨯ fail  2

```

## Dependencies

- [bluebird](https://github.com/petkaantonov/bluebird): Full featured Promises/A+ implementation with exceptionally good performance
- [body-parser](): Node.js body parsing middleware
- [chalk](): Terminal string styling done right. Much color.
- [classnames](https://github.com/JedWatson/classnames): A simple utility for conditionally joining classNames together
- [cors](): Node.js CORS middleware
- [debug](https://github.com/visionmedia/debug): small debugging utility
- [express](): Fast, unopinionated, minimalist web framework
- [express-static-gzip](https://github.com/tkoenig89/express-static-gzip): simple wrapper on top of express.static, that allows serving pre-gziped files
- [figlet](https://github.com/patorjk/figlet.js): Creates ASCII Art from text. A full implementation of the FIGfont spec.
- [lodash](): Lodash modular utilities.
- [material-ui](https://github.com/callemall/material-ui): React Components that Implement Google&#39;s Material Design.
- [mysql](): A node.js driver for mysql. It is written in JavaScript, does not require compiling, and is 100% MIT licensed.
- [normalize.css](): A modern alternative to CSS resets
- [polyfill](https://github.com/marcello3d/polyfill.js): JavaScript polyfills
- [rc-pagination](https://github.com/react-component/pagination): pagination ui component for react
- [rc-select](https://github.com/react-component/select): React Select
- [react](): React is a JavaScript library for building user interfaces.
- [react-dom](): React package for working with the DOM.
- [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin): Facebook&#39;s TapEventPlugin, temporarily available on npm until its made public in their repo
- [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages): Runtime for Regenerator-compiled generator and async functions.
- [superagent](https://github.com/visionmedia/superagent): elegant &amp; feature rich browser / node HTTP with a fluent API
- [superagent-bluebird-promise](https://github.com/KyleAMathews/superagent-bluebird-promise): Add promise support to superagent using Bluebird

## Dev Dependencies

- [apidoc](https://github.com/apidoc/apidoc): RESTful web API Documentation Generator
- [autoprefixer](): Parse CSS and add vendor prefixes to CSS rules using values from the Can I Use website
- [babel-cli](): Babel command line.
- [babel-core](): Babel compiler core.
- [babel-eslint](https://github.com/babel/babel-eslint): Custom parser for ESLint
- [babel-loader](https://github.com/babel/babel-loader): babel module loader for webpack
- [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy): A plugin for Babel 6 that (mostly) replicates the old decorator behavior from Babel 5.
- [babel-preset-es2015](): Babel preset for all es2015 plugins.
- [babel-preset-react](): Babel preset for all React plugins.
- [babel-preset-stage-0](): Babel preset for stage 0 plugins
- [babel-tape-runner](https://github.com/wavded/babel-tape-runner): Babel + Tape for running your ES Next tests
- [compression-webpack-plugin](https://github.com/webpack/compression-webpack-plugin): Prepare compressed versions of assets to serve them with Content-Encoding
- [css-loader](https://github.com/webpack/css-loader): css loader module for webpack
- [dotenv](https://github.com/motdotla/dotenv): Loads environment variables from .env file
- [esdoc](https://github.com/esdoc/esdoc): Good Documentation Generator For JavaScript
- [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin): Extract text from bundle into a file.
- [faucet](https://github.com/substack/faucet): human-readable TAP summarizer
- [favicons-webpack-plugin](https://github.com/jantimon/favicons-webpack-plugin): Let webpack generate all your favicons and icons for you
- [file-loader](https://github.com/webpack/file-loader): file loader module for webpack
- [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin): Simplifies creation of HTML files to serve your webpack bundles
- [nodemon](https://github.com/remy/nodemon): Simple monitor script for use during development of a node.js app.
- [npm-run-all](): A CLI tool to run multiple npm-scripts in parallel or sequential.
- [opn-cli](): A better node-open. Opens stuff like websites, files, executables. Cross-platform.
- [postcss-loader](): PostCSS loader for webpack
- [precss](https://github.com/jonathantneal/precss): Use Sass-like markup in your CSS
- [react-hot-loader](https://github.com/gaearon/react-hot-loader): Tweak React components in real time.
- [shx](https://github.com/shelljs/shx): Portable Shell Commands for Node
- [snazzy](https://github.com/feross/snazzy): Format JavaScript Standard Style as Stylish (i.e. snazzy) output
- [standard](https://github.com/feross/standard): JavaScript Standard Style
- [style-loader](https://github.com/webpack/style-loader): style loader module for webpack
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers
- [tape-async](): A lite wrapper around tape to simplify async testing.
- [url-loader](https://github.com/webpack/url-loader): url loader module for webpack
- [webpack](https://github.com/webpack/webpack): Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server): Serves a webpack app. Updates the browser on changes.
- [webpack-visualizer-plugin](https://github.com/chrisbateman/webpack-visualizer): CMSC 191 search engine client


## License

MIT
