//TODO: the data look good but the device keeps light on all the time.

var callback = {
    onReceived:function (robo, data) {
        console.log("onReceived: " + data);
    },
    onClosed:function (robo, err) {
        console.log("onClosed");
    },
    onOpened:function (robo, err) {
        console.log("start sending out morse code...");
        doit(robo);
        robo.shutdown();
            //end the child process.
            if(process.disconnect){
                process.disconnect();
            }else{
                process.exit();
            }
    }
};

var morse = {};
morse["s"] = [1,0,1,0,1,0]; //3 short
morse["o"] = [1,1,0,1,1,0,1,1,0]; //3 long

function doit(robo){
	var message = "sos";
	for(var i=0;i<100;i++){ //send 100 times
		for(var j=0;j<message.length;j++){
			var letter = message[j];
			sendMorse(robo, morse[letter]);
		}
	}
}

function sendMorse(robo, array){
	for(var i=0;i<array.length;i++){
		if(array[i]){
			robo.turnOnLight();
		}else{
			robo.turnOffLight();
		}
		robo.sleep(500);
	}
}

var emulating = false;
var emulator = null;

if (emulating) {
    emulator = {
        write:function (data) {
            console.log("writing to emulator: " + data);
        }
    };
}

require('./Robo').create({
    baudrate:115200,
    path:"/dev/ttyUSB0",
    emulator:emulator}, callback);
