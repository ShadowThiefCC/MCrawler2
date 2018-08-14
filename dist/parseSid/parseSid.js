"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config/config");
exports.parseSid = function (sid) {
    return sid.substring(config_1.Config.SID_LENTH - config_1.Config.PASSWORD_LENTH, config_1.Config.SID_LENTH);
};
