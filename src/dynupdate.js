// node http api
var http = require('http');

/* 
 SERVICE PROVIDED BY NO-IP.COM
*/

var serviceHost = 'dynupdate.no-ip.com';
var servicePath = '/nic/update';

function DynUpdate() {
  this.options = {};
  this.init();

  this.dynupdate(this.options, function(ok, err){    
    if (err)
      console.log(err);
  });
}

DynUpdate.prototype.init = function() {
  
  var args = process.argv.splice(2);

  if (args.length <=2 || args.length >4) {
    return;
  }

  args.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

  this.options.auth = args[0];
  this.options.hostname = args[1];
  this.options.myip = args[2];
  this.options.offline = args[3];

  return this;
};

DynUpdate.prototype.dynupdate = function(options, next) {
  var hostname; // darulmongo.no-ip.biz
  var myip;     // 82.66.85.67  
  var offline;
  var auth;

  if (!options.auth || !options.hostname || !options.myip)
    return;
  
  hostname = options.hostname || undefined;
  myip = options.myip || undefined;
  offline = options.offline || undefined;
  auth = options.auth || undefined;

  var offlineParam = offline ? '&offline=YES': '';

  var path = '?hostname='+hostname+'&myip='+myip+offlineParam;
  var opts = {
    hostname: serviceHost,
    path: servicePath + path,
    method: 'GET',
    port: 80,
    auth: auth
  };

  var req = http.request(opts, function(res) {
    res.setEncoding('utf8');
    var output = '';
    res.on('data', function (chunk) { output += chunk; });
    res.on('end', function() { return next(null, output); });
  });
  req.on('error', function(e) { return next(e); });      
  req.setTimeout(1000, function() { return next(new Error('timeout')); });
  req.end();
  return this;
};

/**
* Export default singleton.
*/
var dynupdate = new DynUpdate();
module.exports = dynupdate;