var BH1750 = require('bh1750');

function LightSensor() {
}

LightSensor.prototype.initialize = function () {
    try {
        this.bh1750 = new BH1750({
            address: 0x23,
            device: '/dev/i2c-1',
            command: 0x11,
            length: 2
        });
    }
    catch (error) {
        console.log(error);
        return false;
    }

    return true;
};

LightSensor.prototype.read = function (callback) {
    if (this.bh1750) {
        this.bh1750.readLight(callback);
    }
    callback();
};

module.exports = LightSensor;