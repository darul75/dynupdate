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

  this.dynupdate(this.options, function(err, status){    
    if (err)
      console.log(err);
    else
      console.log(status);
  });
}

DynUpdate.prototype.init = function() {
  
  var args = process.argv.splice(2);

  if (args.length <=2 || args.length >4) {
    process.argv = process.argv.concat(args);
    return;
  }

  args.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

  this.options.auth = args[0];
  this.options.hostname = args[1];
  this.options.myip = args[2];
  this.options.offline = args[3];

  process.argv = process.argv.concat(args);

  return this;
};

DynUpdate.prototype.dynupdate = function(options, next) {
  var hostname;
  var myip;
  var offline;
  var auth;

  if (!options.auth || !options.hostname || !options.myip)
    return next(new Error("missing parameters: <NO-IP-auth> <NO-IP-hostname> <myip> [offline]"));
  
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
    res.on('end', function() { 
      switch (output) {
        case 'nohost':
        case 'badauth':
        case 'badagent':
        case '!donator':
        case 'abuse':
        case '911':
          return next(new Error(output));        
        default:
          return next(null, output);        
      }
      
    });
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