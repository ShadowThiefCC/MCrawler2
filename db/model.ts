import * as mongoose from "mongoose";
import { db } from "./db";
import { Document } from "mongoose";
import { schema } from "./schema";

export let DataModel = db.model("dataModel",schema,"question-answer");