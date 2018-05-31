import { nightmare } from "../nmFactory/nmFactory";
import { Config } from "../config/config";
import { parseSid } from "../parseSid/parseSid";
import { match } from "../match/match";

//登陆
export let loginNightmare = function(sid:string, testInter:string){
    testInter = match(testInter)
    return nightmare.on("page",(e:string, msg:string, res:any) => {
        console.log(msg,res)
    })      
        .goto(Config.LOGIN_URL)  
        // .inject('js','jquery.min.js')
        .type(Config.INPUT_USER_ID,sid)
        .type(Config.INPUT_PASSWORD_ID,parseSid(sid))
        .click(Config.INPUT_LOGIN_ID)
        .wait(Config.TEST_ENTRY_ID_1)
        .click(Config.TEST_ENTRY_ID_1)
        .wait(Config.TEST_ENTRY_ID_2)
        .click(Config.TEST_ENTRY_ID_2)
        .wait(testInter)
        .click(testInter)
        .wait(Config.DO_TEST_ENTRY_BUTTON)
        .click(Config.DO_TEST_ENTRY_BUTTON)
        // .wait(Config.DO_TEST_ENTRY_BUTTON_2)
        // .click(Config.DO_TEST_ENTRY_BUTTON_2)
        .wait("#topTabs")
        .evaluate((tag:any) => {
            let doTestEntryButton2 = document.querySelector(tag)
            if(doTestEntryButton2) (doTestEntryButton2 as any).click()
        },Config.DO_TEST_ENTRY_BUTTON_2)
}