import { Schema } from "mongoose";

export let schema = new Schema({
    title:{type:String},
    answer:{type:Array}
})