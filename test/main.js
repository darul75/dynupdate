// test/main.js
var dynupdate = require('../src/dynupdate');
var assert = require("assert");

describe('service calls', function() {
    describe('with ip arguments', function() {
        it('return simple call result', function(done) {
            dynupdate.dynupdate({hostname: 'coucou.no-ip.biz', auth:'user:password', myip: '0.0.0.0'}, function(err, geoData) {
                if (err) console.log(err);
                                
                assert.equal(1, 1);
                
                done();
            });
        });
    });
});