
process.on('message',function(msg){
	console.log('child receives message: ' + JSON.stringify(msg));
});

process.send({'name':'child.js'});

console.info('message from child from console.info');
