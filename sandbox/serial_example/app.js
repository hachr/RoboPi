//var SerialPort = require('serialport').SerialPort;
//
//console.log(SerialPort);
//
//var serialPort = new SerialPort("/dev/ttyUSB0", {
//    baudrate: 9600
//  });
//
//serialPort.on('data', function (data) {
//   console.log('on data: ' + data.toString());
//});
//
//console.log('hello');


var comm = require('./Communication');
var Robo = require('./Robo');

var robo = new Robo(comm);

comm.on('initialized', function (config) {
    console.log('init:' + JSON.stringify(config));
});

comm.on('data', function (data) {
    console.log('data: ' + data);
});

var emulator = {
    write: function(data){
        console.log("writing to emulator: " + data);
    }
};

comm = comm.init({
    baudrate:115200,
    path:"/dev/ttyUSB0",
    //take out emulator to send direct to the serial port.
    emulator: emulator
});

//comm.send("hello");
//emulator.receive("this is data from the emulator");

comm.on("close", function(){
    console.log("close");
});

comm.on("open", function(){
    robo.turnOnLight();
    comm.close();
});
