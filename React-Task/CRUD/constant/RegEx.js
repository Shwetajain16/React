"use strict";
exports.__esModule = true;
exports.RegEx = void 0;
var RegEx = /** @class */ (function () {
    function RegEx() {
    }
    RegEx.emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    RegEx.numregex = /^[0-9]+$/;
    RegEx.ageregEx = /^([0-9]{1,2})$/;
    RegEx.fullnameregex = /^[a-zA-Z ]{0,30}$/;
    RegEx.cityregex = /^[a-zA-Z]{0,30}$/;
    return RegEx;
}());
exports.RegEx = RegEx;

