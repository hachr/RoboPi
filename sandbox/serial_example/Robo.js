function Robo(conf, callback) {
    var comm = require("./Communication");
    this.comm = comm;
    var self = this;
    comm.on('data', function (data) {
        callback.onReceived.call(this, self, data);
    });

    comm.on('open', function (err) {
        callback.onOpened.call(this, self, err);
    });

    comm.on('close', function (err) {
        callback.onClosed.call(this, self, err);
    });
    
    comm.on('sent', function(){
    	callback.onSent.call(this,self);
    });

    comm.init(conf);
}

Robo.prototype.turnOnLight = function () {
    //TODO: [high] (nhat) - have a better way of constructing the command or translation
    this.comm.send("1");
};

Robo.prototype.turnOffLight = function () {
    //TODO: [high] (nhat) - have a better way of constructing the command or translation
    this.comm.send("0");
};


Robo.prototype.shutdown = function(){
    this.comm.close();
};

function factory(configuration, callback) {
    return new Robo(configuration, callback);
}

module.exports = Robo;
module.exports.create = factory;