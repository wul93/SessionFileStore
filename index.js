var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var app = express();

var options={path:'./Origin',
	setpath:function(n){
	  this.path=n;
	}
};

function myFileStore(n){
	options.setpath(n);
	return new FileStore(options);
	
};

app.use(session({
    store: new myFileStore('./FileStore'),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

app.get('/', function (req, res) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>this is ' + req.session.views + ' times you broswer the web</p>');
    res.end();
  } else {
    req.session.views = 1;
    res.end('Please refresh the page!');
  }
});

var server = app.listen(5000, function () {
console.log('app listening at 5000');
});