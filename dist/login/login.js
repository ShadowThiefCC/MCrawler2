"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nmFactory_1 = require("../nmFactory/nmFactory");
var config_1 = require("../config/config");
var parseSid_1 = require("../parseSid/parseSid");
//登陆
exports.loginNightmare = function (sid, testInter, teacher) {
    return nmFactory_1.nightmare.on("page", function (e, msg, res) {
        console.log(msg, res);
    })
        .goto(config_1.Config.LOGIN_URL)
        .type(config_1.Config.INPUT_USER_ID, sid)
        .type(config_1.Config.INPUT_PASSWORD_ID, parseSid_1.parseSid(sid))
        .click(config_1.Config.INPUT_LOGIN_ID)
        .wait(config_1.Config.TEST_ENTRY_ID_1)
        .evaluate(function (teacher) {
        var ele = document.querySelectorAll("#_4_1termCourses_noterm ul li");
        for (var i = 0; i < ele.length; i++) {
            if (new RegExp(teacher).test(ele.item(i).innerText)) {
                ele.item(i).querySelector("a").click();
            }
        }
    }, teacher)
        .wait(config_1.Config.TEST_ENTRY_ID_2)
        .evaluate(function () {
        var ele = document.querySelectorAll("#courseMenuPalette_contents li");
        for (var i = 0; i < ele.length; i++) {
            if (new RegExp("习题测验").test(ele.item(i).innerText)) {
                ele.item(i).querySelector("a").click();
            }
        }
    })
        .wait("#pageTitleText")
        .evaluate(function (testInter) {
        var testCol = document.querySelector("#content_listContainer").querySelectorAll("li");
        for (var i = 0; i < testCol.length; i++) {
            var ele = testCol.item(i).querySelector("a");
            if (ele.innerText == testInter) {
                ele.click();
                return;
            }
        }
    }, testInter)
        .wait(config_1.Config.DO_TEST_ENTRY_BUTTON)
        .click(config_1.Config.DO_TEST_ENTRY_BUTTON)
        .wait("#topTabs")
        .evaluate(function (tag) {
        var doTestEntryButton2 = document.querySelector(tag);
        if (doTestEntryButton2)
            doTestEntryButton2.click();
    }, config_1.Config.DO_TEST_ENTRY_BUTTON_2);
};
