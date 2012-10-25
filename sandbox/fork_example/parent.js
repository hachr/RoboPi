var cp = require('child_process');
var child = cp.fork(__dirname + '/child.js');

console.log('parent code ends here.');

