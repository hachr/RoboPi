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
    }
};

var morse = {};
morse["s"] = [1,0,1,0,1,0]; //3 short
morse["o"] = [1,1,0,1,1,0,1,1,0]; //3 long
morse[" "] = [0,0]; // space

function doit(robo){
	var message = " s o s ";
    var morseMessage = [];
	for(var i=0;i<100;i++){ //send 100 times
		for(var j=0;j<message.length;j++){
			var letter = message[j];
            morseMessage = morseMessage.concat(morse[letter]);
		}
	}

    sendMorse(robo, morseMessage);
}

function sendMorse(robo, array){
    if (array.length > 0) {
        if(array[0]){
            //console.log("on");
            robo.turnOnLight();
        } else{
            //console.log("off");
            robo.turnOffLight();
        }
        setTimeout(function(){
            sendMorse(robo, array.slice(1, array.length));
        }, 500);
    } else {
        robo.shutdown();
        //end the child process.
        if(process.disconnect){
            process.disconnect();
        }else{
            process.exit();
        }
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
