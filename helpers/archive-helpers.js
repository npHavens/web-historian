var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var Promise = require('bluebird');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile(exports.paths.list, 'utf8', function(err, content) {
      if (err) {
        reject(err);
      }
      resolve(content.split('\n'));
    });
  });
};

exports.isUrlInList = function(url) {
  return new Promise(function(resolve, reject) {
    fs.readFile(exports.paths.list, 'utf8', function(err, content) {
      if (err) {
        reject(err);
      }
      var cleanString = content.replace(/\: true/g, '').replace(/\: false/g, '');
      var ind = cleanString.split('\n').indexOf(url);
      if (ind > -1) {
        resolve(true, ind);
      } else {
        resolve(false, -1);
      }
    });
  });
};

exports.addUrlToList = function(url) {
  return new Promise(function(resolve, reject) {
    fs.appendFile(exports.paths.list, url + ': false' + '\n', function (err) {
      //console.log('url:', url)
      if (err) {
        console.log('error');
        reject(err);
      }
      resolve();
    });
  });
};

exports.isUrlArchived = function(url, callback) {
  //console.log(exports.paths.archivedSites)
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if (err) {
      throw err;
    }
    if (files.indexOf(url) > -1) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.downloadUrls = function(urls) {
  //get url list
  urls.forEach(function(url) {
  /*    exports.isUrlArchived(url, function(isArchived) {
        if (!isArchived) {*/
    // use the request module
    // use HTML as 3rd arguement
    request('http://' + url, function(err, res, html) {
      fs.writeFile(exports.paths.archivedSites + '/' + url, html, function (err) {
        if (err) {
          throw err;
        } else {
          fs.appendFile(exports.paths.list, url + ': true' + '\n', function (err) {
          //console.log('url:', url)
            if (err) {
              console.log('error');
              throw err;
            }
            console.log(url + ' was written back into the log');
          });
          console.log('success! I wrote the HTML!');
        }
      });
    });
    /*      }
      });*/
  });
  //get file list
  //make download list
  //make new folders from download list
};
