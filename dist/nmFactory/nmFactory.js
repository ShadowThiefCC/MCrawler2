"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nightmare = require("nightmare");
exports.nightmare = new Nightmare({
    show: false,
    openDevTools: {
        mode: "detach"
    }
});
