#!/usr/bin/env node

var request = require('request')

Number.prototype.formatMoney = function(c, d, t){
  var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;

   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var url = 'https://d3gxuc3bq48qfa.cloudfront.net/eoy-2014-total';

request({
  url: url,
  json: true
}, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log('$' + body.sum.formatMoney());
  }
});
