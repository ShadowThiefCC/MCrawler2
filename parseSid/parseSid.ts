import { Config } from "../config/config";

export let parseSid = function(sid:string){
    return sid.substring(Config.SID_LENTH - Config.PASSWORD_LENTH, Config.SID_LENTH)
}