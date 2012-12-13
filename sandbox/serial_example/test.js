var SerialPort = require("serialport").SerialPort


var sp = new SerialPort("/dev/ttyUSB0",{baudrate: 115200});


sp.on("close", function(){
    console.log("closed");
});

sp.on("data", function(data){
    console.log("data:" + data);
});

sp.on("open", function(data){
    console.log("open:" + data);
});

sp.close();
