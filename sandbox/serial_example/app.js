var cp = require('child_process');
var child = cp.fork(__dirname + '/child.js');

child.on('exit', function(code){
	console.log("done!!");
    process.exit(0);
});
