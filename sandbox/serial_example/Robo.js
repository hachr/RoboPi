function Robo(comm) {
    this.comm = comm;
}

function noop() {
    //no-op
}

Robo.prototype.turnOnLight = function () {
    //TODO: [high] (nhat) - have a better way of constructing the command or translation
    this.comm.send("1");
};

Robo.prototype.turnOffLight = function () {
    //TODO: [high] (nhat) - have a better way of constructing the command or translation
    this.comm.send("0");
};

/**
 * //TODO: [high] (nhat) - consider using step library to chain the callback.
 * utility, just idle for x amount of millis
 * @param {Number} interval
 * @param {Function} callback
 */
Robo.prototype.sleep = function (interval, callback) {
    if (interval) {
        setTimeout(function () {
            callback();
        }, interval);
    }
};

module.exports = Robo;