console.log("this is from the child.js");

process.on('message',function(msg){
	console.log("received from parent: " + msg['m']);


	if(msg['m']=='exit'){
		process.send({o:'k'});
		process.disconnect();
	}
});

//throw new Error("hello");

