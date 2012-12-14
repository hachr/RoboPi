/**
 *  sending out S.O.S.
 */
var morse = {};
morse["s"] = [1,0,1,0,1,0]; //3 short
morse["o"] = [1,1,0,1,1,0,1,1,0]; //3 long

//data to send out
var data = [];
data = data.concat(morse["s"], [0], morse["o"], [0], morse["s"]);

var blah = false;

var callback = {
	counter: 0,
    onReceived:function (robo, data) {
        console.log("onReceived: " + data + " size: " + data.length);
    },
    onClosed:function (robo, err) {
        console.log("onClosed");
    },
    onOpened:function (robo, err) {
        console.log("start sending out morse code...");
        //send first data.
        robo.turnOffLight();
    },
    onSent: function(robo){		    
    	var bit = data[(callback.counter++)%data.length];
    	if(bit){
    		robo.turnOnLight();
    	}else{
    		robo.turnOffLight();
    	}
    	//keep sending.
    }
};

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
    delay:500,
    emulator:emulator}, callback);
