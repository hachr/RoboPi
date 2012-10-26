var cp = require('child_process');
var child = cp.fork(__dirname + '/child.js');

child.on('exit', function(code){
	console.log("child exited with code: " + code);	
});

console.log('parent is telling child to exit');
child.send({m:'exit'});

console.log('parent code ends here.');

