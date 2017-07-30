var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helpers = require('./http-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  //console.log(req.method);
  var asset = './web/public/index.html';
  if (req.method === 'GET') {

    if (req.url === '/' || req.url === '/index.html') {
      //serveAssets(res, asset, callback)
      helpers.serveAssets(res, asset);
      return;
    }

    if (req.url === '/www.google.com') {
      //console.log('hitting request for googl');
      asset = archive.paths.archivedSites + req.url;
      helpers.serveAssets(res, asset);
    } else {
      //console.log('hitting else case')
      res.writeHead(404, helpers.headers);
      res.end(null);
    }
  }

  if (req.method === 'POST') {
    //get data from request object
    //on('data')
    //console.log('handling POST request');
    req.on('data', function(data) {
      var string = data + '';
      archive.addUrlToList(string.split('=')[1], function(result) {
        res.writeHead(302, helpers.headers);
        res.end();
      });
    });


  }



};