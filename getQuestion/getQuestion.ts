import { DataModel } from "../db/model";

export let getQuestion = function(query:any):Promise<Document[]>{
    return new Promise((resolve:any, reject:any) => {
        DataModel.find(query,(err:any, res:Document[]) => {
            if(err) throw err
            resolve(res)
        })
    })
}