'use strict';

var http = require('http');
var sitemapToArray = require('utils-sitemap-to-array');
var reportPageSpeed = require('report-site-pagespeed');
var sitemapUrl = 'http://www.telemark.no/sitemap.xml';
var body = '';
var options = {
  apikey:'insert-your-apikey',
  filename:'report.mobile.csv',
  verbose:true
};

function getUrl(input){
  return input.loc;
}

http.get(sitemapUrl, function(res) {

  res.on('data', function(buf){
    body += buf.toString();
  });

  res.on('end', function(){
    sitemapToArray(body, function(err, result){
      if(err){
        console.error(err);
      } else {
        options.urls = result.map(getUrl);
        reportPageSpeed(options, function(error, data){
          if(error){
            console.error(error);
          } else {
            console.log(data);
          }
        });
      }
    });
  });

}).on('error', function(e) {
  console.error(e);
});