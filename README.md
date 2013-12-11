# Satelize [![NPM version](https://badge.fury.io/js/dynupdate.png)](http://badge.fury.io/js/dynupdate) [![Build Status](https://travis-ci.org/darul75/dynupdate.png?branch=master)](https://travis-ci.org/darul75/dynupdate)

**Dynupdate** is a small implementation for NodeJS to update no-ip and submit a dynamic dns update request.

## Why ?

Because ecchymose in the nose. IP may change my friend.

## Demo


## Install

~~~
npm install dynupdate
~~~

## Usage

```javascript
var dynupdate = require('dynupdate');

dynupdate.dynupdate({hostname: 'darulmongo.no-ip.biz', auth:'user:password', myip: '0.0.0.0'}, function(err, status) {
  // process err
  
  // process status
  // - good IP_ADDRESS Success DNS hostname update successful. Followed by a space and the IP address it was updated to.
  // - nochg IP_ADDRESS  Success IP address is current, no update performed. Followed by a space and the IP address that it is currently set to.
  // - nohost  Error Hostname supplied does not exist under specified account, client exit and require user to enter new login credentials before performing and additional request.
  // - badauth Error Invalid username password combination
  // - badagent  Error Client disabled. Client should exit and not perform any more updates without user intervention.
  // - !donator  Error An update request was sent including a feature that is not available to that particular user such as offline options.
  // - abuse Error Username is blocked due to abuse. Either for not following our update specifications or disabled due to violation of the No-IP terms of service. Our terms of service can be viewed at http://www.noip.com/legal/tos. Client should stop sending updates.
  // -911 Error A fatal error on our side such as a database outage. Retry the update no sooner 30 minutes.
});
        
## Return    

~~~ status
The one above
~~~

Details

- **good** 

## Options

- **hostname** : 
- **auth** : 

## License

The MIT License (MIT)

Copyright (c) 2013 Julien Valéry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
