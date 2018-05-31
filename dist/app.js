"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const insertQuestion_1 = require("./insertQuestion/insertQuestion");
const getQuestion_1 = require("./getQuestion/getQuestion");
const login_1 = require("./login/login");
const argv_1 = require("./argv/argv");
//第一个参数为学号
const sid = process.argv[2];
//决定实现什么操作
const opera = process.argv[3];
//测试号
const testID = process.argv[4];
argv_1.isEmpty(sid);
argv_1.isEmpty(opera);
argv_1.isEmpty(testID);
if (opera == "collection") {
    login_1.loginNightmare(sid, testID)
        .wait("#bottom_submitButtonRow")
        .evaluate(() => {
        //提交测验
        eval(`
            document.forms.saveAttemptForm.save_and_submit.value = 'true';
            assessment.resetFields();
            assessment.submitAttemptForm();
            document.forms.saveAttemptForm.save_and_submit.value = '';
        `);
        console.log("hello");
    })
        .wait(config_1.Config.SHOW_ANSWER)
        .click(config_1.Config.SHOW_ANSWER)
        .wait(".vtbegenerated")
        .evaluate(() => {
        //问题主题
        let questionBodys = document.querySelectorAll(".details table tbody");
        //问题集合
        let questionArr = [];
        for (let i = 0; i < questionBodys.length; i += 2) {
            let answerArr = [];
            let answer;
            let title = questionBodys.item(i).querySelector(".vtbegenerated.inlineVtbegenerated").innerText;
            //正确答案
            let tmp = questionBodys.item(i + 1).querySelectorAll("tr");
            for (let j = 0; j < tmp.length; j++) {
                if (tmp.item(j).querySelector(".correctAnswerFlag")) {
                    if (j == 1) {
                        answer = tmp.item(j).querySelector(".reviewQuestionsAnswerDiv").innerText;
                    }
                    else {
                        answer = tmp.item(j).innerText;
                    }
                    answerArr.push(answer);
                }
            }
            questionArr.push({ title: title, answer: answerArr });
        }
        return questionArr;
    })
        .then((questionArr) => __awaiter(this, void 0, void 0, function* () {
        console.log(questionArr.length);
        for (let v of questionArr) {
            let data = yield getQuestion_1.getQuestion({ title: v.title });
            if (data.length == 0) {
                console.log("collection");
                yield insertQuestion_1.insertQuestion(v.title, v.answer);
            }
            else {
                console.log("repeat");
            }
        }
    }))
        .catch(err => console.log(err));
}
else {
    //自动填写
    (() => __awaiter(this, void 0, void 0, function* () {
        let doc = yield getQuestion_1.getQuestion({});
        login_1.loginNightmare(sid, testID)
            .wait("legend")
            .evaluate((doc) => {
            let questionId = 1;
            let questionContent = "stepcontent";
            let trim = function (s) {
                return s.replace(/\\s*|\t|\r|\n/g, "");
            };
            while (true) {
                let ele = document.querySelector(`#${questionContent}${questionId}`);
                if (!ele)
                    break;
                //题目
                let t = ele.querySelector("legend").innerText;
                //判断题
                let judgeAnswer = ele.parentElement.querySelectorAll("p");
                //多选题 单选题
                let checkBoxRadioAnswer = ele.parentElement.querySelectorAll("tbody tr");
                //查看是否存在此题目的答案
                let tArr = doc.filter(v => new RegExp(trim(t), 'g').test(trim(v.title)));
                if (tArr.length != 0) {
                    // if(new RegExp("展过程中，要更加自觉").test(t)) console.log(tArr)
                    for (let val of tArr[0].answer) {
                        //判断题
                        for (let i = 0; i < judgeAnswer.length - 1; i++) {
                            if (!judgeAnswer.item(i))
                                break;
                            if (new RegExp(trim(judgeAnswer.item(i).innerText), "g").test(val)) {
                                // console.log("判断题点击");
                                let obj = judgeAnswer.item(i).querySelector("label");
                                if (obj)
                                    obj.click();
                            }
                        }
                        //多选单选题
                        for (let i = 0; i < checkBoxRadioAnswer.length; i++) {
                            if (!checkBoxRadioAnswer.item(i))
                                break;
                            let text = checkBoxRadioAnswer.item(i).innerText;
                            if (new RegExp(trim(text), "g").test(val)) {
                                checkBoxRadioAnswer.item(i).querySelector("label").click();
                            }
                        }
                    }
                }
                questionId++;
            }
        }, doc)
            .evaluate(() => {
            //提交测验
            eval(`
                document.forms.saveAttemptForm.save_and_submit.value = 'true';
                assessment.resetFields();
                assessment.submitAttemptForm();
                document.forms.saveAttemptForm.save_and_submit.value = '';
            `);
            console.log("hello");
        })
            .wait(config_1.Config.SHOW_ANSWER)
            .click(config_1.Config.SHOW_ANSWER)
            .wait(".infoListWrapper")
            .evaluate(() => {
            let result = document.querySelector(".infoListWrapper").querySelector("tr:nth-child(7) td").innerText.split(" ")[1];
            return result;
        })
            .then((result) => {
            console.log(result);
            process.exit();
        })
            .catch(err => {
            console.log(err);
            process.exit();
        });
    }))();
}
