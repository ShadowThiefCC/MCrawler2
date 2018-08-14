"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nightmare = require("nightmare");
exports.nightmare = new Nightmare({
    show: true,
    openDevTools: {
        mode: "detach"
    }
});
