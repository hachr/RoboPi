var comm = require('./Communication');
var Robo = require('./Robo');

var robo = new Robo(comm);

comm.on('initialized', function (config) {
    console.log('init:' + JSON.stringify(config));
});

comm.on('data', function (data) {
    console.log('data: ' + data);
});

comm.on("close", function () {
    console.log("close");
    process.exit(0);
});

comm.on("open", function () {
    console.log("open");
    robo.turnOnLight();
    robo.sleep(10, function () {
        robo.turnOffLight();
        comm.close();
    });
});

var emulator = {
    write:function (data) {
        console.log("writing to emulator: " + data);
    }
};


var emulating = true;

comm = comm.init({
    baudrate:115200,
    path:"/dev/ttyUSB0",
    //take out emulator to send direct to the serial port.
    emulator:emulating ? emulator : null
});

if (emulating) {
    comm.send("hello");
    emulator.receive("this is data from the emulator");
}


