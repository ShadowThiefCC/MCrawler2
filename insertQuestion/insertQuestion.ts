import { DataModel } from "../db/model";
import { Promise } from "mongoose";

export let insertQuestion = function(title:string, answer:string){
    return new Promise((resolve:any, reject:any) => {
        DataModel.create({
            title:title,
            answer:answer
        },(err:any, doc:any) => {
            if(err) console.log(err)
            resolve(doc)
        })
    })
}