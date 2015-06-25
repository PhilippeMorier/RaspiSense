'use strict';

function Interface(name, methods) {
    if (arguments.length !== 2) {
        throw new Error('Interface constructor called with ' + arguments.length +
            ' arguments, but expected exactly 2.');
    }
    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error('Interface constructor expects method names to be passed in as a string.');
        }
        this.methods.push(methods[i]);
    }
}

Interface.prototype.ensureItGetsImplementedBy = function (object) {
    if (arguments.length !== 1) {
        throw new Error('Function Interface.ensureItGetsImplementedBy called with ' +
            arguments.length + ' arguments, but expected at least 1.');
    }

    for (var j = 0, methodsLen = this.methods.length; j < methodsLen; j++) {
        var method = this.methods[j];
        if (!object[method] || typeof object[method] !== 'function') {
            throw new Error('Interface.ensureItGetsImplementedBy: object '
                + 'does not implement the \'' + this.name + '\'' +
                '\nMethod \'' + method + '\' was not found.');
        }
    }
};

module.exports = Interface;
