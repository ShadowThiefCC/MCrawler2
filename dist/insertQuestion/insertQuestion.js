"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../db/model");
const mongoose_1 = require("mongoose");
exports.insertQuestion = function (title, answer) {
    return new mongoose_1.Promise((resolve, reject) => {
        model_1.DataModel.create({
            title: title,
            answer: answer
        }, (err, doc) => {
            if (err)
                console.log(err);
            resolve(doc);
        });
    });
};
