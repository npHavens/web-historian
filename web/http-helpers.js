var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  //console.log(asset)
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  return fs.readFile(asset, 'utf8', function (er, words) {
    // file = words + '';
    //console.log('words:', words)
    res.writeHead(200, helpers.headers);
    res.write(words);
    res.end();
  });
};



// As you progress, keep thinking about what helper functions you can put here!
