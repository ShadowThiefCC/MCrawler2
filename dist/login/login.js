"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nmFactory_1 = require("../nmFactory/nmFactory");
const config_1 = require("../config/config");
const parseSid_1 = require("../parseSid/parseSid");
const match_1 = require("../match/match");
//登陆
exports.loginNightmare = function (sid, testInter) {
    testInter = match_1.match(testInter);
    return nmFactory_1.nightmare.on("page", (e, msg, res) => {
        console.log(msg, res);
    })
        .goto(config_1.Config.LOGIN_URL)
        .type(config_1.Config.INPUT_USER_ID, sid)
        .type(config_1.Config.INPUT_PASSWORD_ID, parseSid_1.parseSid(sid))
        .click(config_1.Config.INPUT_LOGIN_ID)
        .wait(config_1.Config.TEST_ENTRY_ID_1)
        .click(config_1.Config.TEST_ENTRY_ID_1)
        .wait(config_1.Config.TEST_ENTRY_ID_2)
        .click(config_1.Config.TEST_ENTRY_ID_2)
        .wait(testInter)
        .click(testInter)
        .wait(config_1.Config.DO_TEST_ENTRY_BUTTON)
        .click(config_1.Config.DO_TEST_ENTRY_BUTTON)
        .wait("#topTabs")
        .evaluate((tag) => {
        let doTestEntryButton2 = document.querySelector(tag);
        if (doTestEntryButton2)
            doTestEntryButton2.click();
    }, config_1.Config.DO_TEST_ENTRY_BUTTON_2);
};
