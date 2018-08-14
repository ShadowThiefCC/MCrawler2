"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    title: { type: String },
    answer: { type: Array }
});
