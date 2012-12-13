var comm = require('./Communication');
var robo = require('./Robo').create(comm);

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

comm = comm.init({
    baudrate:115200,
    path:"/dev/ttyUSB0"
});