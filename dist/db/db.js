"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.db = mongoose.createConnection("mongodb://localhost:27017/QuestionData");
exports.db.on("connected", () => {
    console.log("连接数据库成功");
});
exports.db.on("disconnected", () => {
    console.log("断开与数据库的连接");
});
exports.db.on("error", (err) => {
    console.log(`连接过程中发现了一个错误：${JSON.stringify(err)}`);
});
