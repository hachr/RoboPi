var SerialPort = require('serialport').SerialPort;

console.log(SerialPort);

var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 9600
  });

serialPort.on('data', function (data) {
   console.log('on data: ' + data.toString());
});

console.log('hello');


