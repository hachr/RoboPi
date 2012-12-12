/**********************************************************************************************************************
 * Communication object that performs the data communication. It uses SerialPort for actual serial communication. We
 * should be able to plug in a different type of communication for emulation
 *
 *********************************************************************************************************************/


var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    SerialPort = require('serialport').SerialPort;

/**
 *
 * @constructor
 */
function Communication() {
    EventEmitter.call(this);
    this.comm = null;
}

util.inherits(Communication, EventEmitter);

Communication.EVENTS = {
    INITIALIZED:"initialized",
    DATA:"data"
};


var EVENTS = Communication.EVENTS;


/**
 *
 * @param {Object} options
 */
Communication.prototype.init = function (options) {
    var conf = options || {
        baudrate:9600,
        path:"/dev/ttyUSB0"
    };

    var self = this;

    if (conf["emulator"]) {
        this.comm = conf["emulator"];
        this.comm.receive = function (data) {
            self.emit(EVENTS.DATA, data);
        }
    } else {
        this.comm = new SerialPort(conf.path, conf);
        this.comm.on('data', function (data) {
            self.emit(EVENTS.DATA, data);
        });
    }

    //emit custom event
    this.emit(EVENTS.INITIALIZED, conf);
    return this;
};

/**
 *
 * @param {string} data
 */
Communication.prototype.send = function (data) {
    //TODO: [high] (nhat) - assert comm is not null
    this.comm.write(data);
};


//export default constructor, we need to call init.
module.exports = new Communication();