"use strict";
exports.__esModule = true;
exports.ValidatorCLS = void 0;
var Constants_1 = require("../constant/Constants");
var ValidatorCLS = /** @class */ (function () {
    function ValidatorCLS() {
    }
    ValidatorCLS.prototype.isValidEmailStr = function (s) {
        return Constants_1.Constants.emailRegex.test(s);
    };
    ValidatorCLS.prototype.isValidZipCode = function (s) {
        return s.length === 6 && Constants_1.Constants.numberRegex.test(s);
    };
    return ValidatorCLS;
}());
exports.ValidatorCLS = ValidatorCLS;
