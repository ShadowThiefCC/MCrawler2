"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../db/model");
exports.getQuestion = function (query) {
    return new Promise((resolve, reject) => {
        model_1.DataModel.find(query, (err, res) => {
            if (err)
                throw err;
            resolve(res);
        });
    });
};
