"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config/config");
exports.match = function (testID) {
    switch (testID) {
        case "test7":
            return config_1.Config.TEST_7;
        case "test8":
            return config_1.Config.TEST_8;
        case "test9":
            return config_1.Config.TEST_9;
        case "test10":
            return config_1.Config.TEST_10;
        case "test11_12":
            return config_1.Config.TEST_11_12;
        case "test8_select":
            return config_1.Config.TEST_8_SELECT;
    }
};
