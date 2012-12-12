function Robo(comm) {
    this.comm = comm;
}

Robo.prototype.turnOnLight = function () {
    //TODO: [high] (nhat) - have a better way of constructing the command or translation
    this.comm.send("1");
};

Robo.prototype.turnOffLight = function () {
    //TODO: [high] (nhat) - have a better way of constructing the command or translation
    this.comm.send("0");
};

module.exports = Robo;