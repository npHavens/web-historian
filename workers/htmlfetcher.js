// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.var fs = require('fs');
var helpers = require('../helpers/archive-helpers');
var fs = require('fs');
var schedule = require('node-schedule');





var downLoadPendingUrls = () => {

  // var list = helpers.readListOfUrls(function(arr) {
  //   var newList = [];
  //   var pending = [];
  //   arr.forEach((item)=>{
  //     var url = item.split(': ');
  //     if (url[1] === 'false') {
  //       pending.push(url[0]);
  //     } else {
  //       newList.push(item);
  //     }
  //   });
  //   if (newList.length > 0) {
  //     fs.writeFile(helpers.paths.list, newList.join('\n'), function(err) {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('Success! Over wrote url list');
  //       }
  //     });
  //   }

  //   helpers.downloadUrls(pending);
  // });
  helpers.readListOfUrls().then(function(arr) {
    iterateList(arr);
  })
};

var iterateList = function(arr) {
  var newList = [];
    var pending = [];
    arr.forEach((item)=>{
      var url = item.split(': ');
      if (url[1] === 'false') {
        pending.push(url[0]);
      } else {
        newList.push(item);
      }
    });
    if (newList.length > 0) {
      fs.writeFile(helpers.paths.list, newList.join('\n'), function(err) {
        if (err) {
          throw err;
        } else {
          console.log('Success! Over wrote url list');
        }
      });
    }

    helpers.downloadUrls(pending);
  };

var j = schedule.scheduleJob('*/1 * * * *', function() {
  console.log('Cron called!');
  downLoadPendingUrls();
});