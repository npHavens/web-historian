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
      // check if URL is in the list - 200 ms
      // check to see if URL is archieved - 1 second
      // if it is there... then return the contents.
      // if it is not there... return and error.
      // What if it is partially there?

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
    req.on('data', function(data) {
      var string = data + '';
      // check if URL is in the list and //"downloaded"
      archive.isUrlInList(string, function(isInList, ind) {
        console.log(ind);
        if (isInList) {
          // need to handle -1 *******
          archive.readListOfUrls(function(arr) {
            if (arr[ind].split(': ')[1] === 'true') {
              asset = archive.paths.archivedSites + string;
              helpers.serveAssets(res, asset);
            } else {
              asset = './web/public/loading.html';
              helpers.serveAssets(res, asset);
            }
          });
        } else {
          archive.addUrlToList(string.split('=')[1], function(result) {
            console.log('post request', string);
            res.writeHead(302, helpers.headers);
            res.end();
          });
        }
      });
      // if yes return data serve asset
      // if not show loading page.






    });


  }



};