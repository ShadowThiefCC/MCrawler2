import { nightmare } from "../nmFactory/nmFactory";
import { Config } from "../config/config";
import { parseSid } from "../parseSid/parseSid";
import { match } from "../match/match";

//登陆
export let loginNightmare = function(sid:string, testInter:string, teacher:string){
    return nightmare.on("page",(e:string, msg:string, res:any) => {
        console.log(msg,res)
    })      
        .goto(Config.LOGIN_URL)  
        .type(Config.INPUT_USER_ID,sid)
        .type(Config.INPUT_PASSWORD_ID,parseSid(sid))
        .click(Config.INPUT_LOGIN_ID)
        .wait(Config.TEST_ENTRY_ID_1)
        .evaluate((teacher:string) => {
            let ele = document.querySelectorAll("#_4_1termCourses_noterm ul li")
            for(let i = 0;i < ele.length;i++){
                if(new RegExp(teacher).test((ele.item(i) as any).innerText)) {
                    ele.item(i).querySelector("a").click()
                }
            }
        },teacher)
        .wait(Config.TEST_ENTRY_ID_2)
        .evaluate(() => {
            let ele = document.querySelectorAll("#courseMenuPalette_contents li")
            for(let i = 0;i < ele.length;i++) {
                if(new RegExp("习题测验").test((ele.item(i) as any).innerText)) {
                    ele.item(i).querySelector("a").click()
                }
            }
        })
        .wait("#pageTitleText")
        .evaluate((testInter:string) => {
            let testCol = document.querySelector("#content_listContainer").querySelectorAll("li")
            for(let i = 0;i < testCol.length;i++){
                let ele = testCol.item(i).querySelector("a")
                if(ele.innerText == testInter) {
                    ele.click()
                    return
                }
            }
        },testInter)
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