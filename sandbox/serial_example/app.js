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
    baudrate:9600,
    path:"/dev/ttyUSB0",
    //take out emulator to send direct to the serial port.
    emulator: emulator
});


comm.send("hello");

emulator.receive("this is data from the emulator");
