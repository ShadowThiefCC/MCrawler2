"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../db/model");
exports.getQuestion = function (query) {
    return new Promise(function (resolve, reject) {
        model_1.DataModel.find(query, function (err, res) {
            if (err)
                throw err;
            resolve(res);
        });
    });
};
