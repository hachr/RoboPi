var cp = require('child_process');
var child = cp.fork(__dirname + '/child.js');
var childException = cp.fork(__dirname + '/child_exception.js',{silent: true});
var childError = cp.fork(__dirname + '/child_error.js',{silent: false});

child.on('exit', function(code){
	console.log("\n\nchild exited with code: " + code);	
});

childException.on('exit', function(code){
	console.log("\n\nparent received exit event from child_exception exited with code: " + code);	
});

childError.on('exit', function(code){
	console.log("\n\nparent received exit event from child_error exited with code: " + code);	
});

child.on('message', function(data){
	console.log("parent receives message from child: " + data['o']);	
});

console.log('parent is telling child to exit');
child.send({m:'exit'});

console.log('parent code ends here.');

