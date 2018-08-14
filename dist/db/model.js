"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var schema_1 = require("./schema");
exports.DataModel = db_1.db.model("dataModel", schema_1.schema, "question-answer");
