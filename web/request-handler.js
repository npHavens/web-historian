var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helpers = require('./http-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  console.log(req.url);
  var asset = './web/public/index.html';
  if (req.method === 'GET' || request.method === 'OPTIONS') {

    if (req.url === '/' || req.url === '/index.html') {
      //serveAssets(res, asset, callback)
      helpers.serveAssets(res, asset);
    }

    if (req.url === '/www.google.com') {
      //console.log('hitting request for googl');
      asset = archive.paths.archivedSites + req.url;
      helpers.serveAssets(res, asset);
    } else {
      res.writeHead(404, helpers.headers);
      res.end();
    }


  }
};