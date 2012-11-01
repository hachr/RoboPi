var cp = require('child_process')
var fs = require('fs')
var events = require('events');

//custom stream
var MonitorStream = function(){
	events.EventEmitter.call(this);
	this.readable=true;
	this.writable=false;
};

//require('util').inherits(MonitorStream, fs.WriteStream);
//
////read
//MonitorStream.prototype.read = function(){
//	args = Array.prototype.slice.call(arguments,0);
//	console.log("monitor: " + args);
//	this.emit.apply(this,['data'].concat(args));
//};
//
////write
//MonitorStream.prototype.write = function(){
//	args = Array.prototype.slice.call(arguments,0);
//	console.log("monitor: " + args);
//	this.emit.apply(this,['data'].concat(args));
//};
//
////end
//MonitorStream.prototype.end = function(){
//	args = Array.prototype.slice.call(arguments,0);
//	this.emit.apply(this,['end'].concat(args));
//};
//

var out = fs.openSync('./out.log', 'w'), err = fs.openSync('./out.log', 'w');

var child = cp.spawn('node', [__dirname + '/child.js'], {
	cwd: __dirname, /*path for the child process, we can restrict its path.*/
	stdio: ['ignore',out,err,'ipc']

});

child.on('message', function(message){
	console.log('parent receives: ' + JSON.stringify(message));
});

child.on('exit', function(code){
	console.log('child is exiting with code: ' + code);
});

child.send({'message':'hello'});


console.log('parent process finishes.');