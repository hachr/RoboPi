var callback = {
    onReceived:function (robo, data) {
        console.log("onReceived: " + data);
    },
    onClosed:function (robo, err) {
        console.log("onClosed");
    },
    onOpened:function (robo, err) {
        console.log("onOpened");
        robo.turnOnLight();
        robo.shutdown();

        //end the child process.
        if (process.disconnect) {
            process.disconnect();
        } else {
            process.exit();
        }
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
    emulator:emulator}, callback);
