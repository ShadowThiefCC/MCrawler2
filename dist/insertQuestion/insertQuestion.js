"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../db/model");
var mongoose_1 = require("mongoose");
exports.insertQuestion = function (title, answer) {
    return new mongoose_1.Promise(function (resolve, reject) {
        model_1.DataModel.create({
            title: title,
            answer: answer
        }, function (err, doc) {
            if (err)
                console.log(err);
            resolve(doc);
        });
    });
};
