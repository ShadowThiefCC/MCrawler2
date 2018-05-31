"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const schema_1 = require("./schema");
exports.DataModel = db_1.db.model("dataModel", schema_1.schema, "question-answer");
