"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config/config");
var insertQuestion_1 = require("./insertQuestion/insertQuestion");
var getQuestion_1 = require("./getQuestion/getQuestion");
var login_1 = require("./login/login");
var argv_1 = require("./argv/argv");
//第一个参数为学号
var sid = process.argv[2];
//决定实现什么操作
var opera = process.argv[3];
//测试号
var testID = process.argv[4];
//教学老师
var teacher = process.argv[5];
argv_1.isEmpty(sid);
argv_1.isEmpty(opera);
argv_1.isEmpty(testID);
argv_1.isEmpty(teacher);
if (opera == "collection") {
    login_1.loginNightmare(sid, testID, teacher)
        .wait("#bottom_submitButtonRow")
        .evaluate(function () {
        //提交测验
        eval("\n            document.forms.saveAttemptForm.save_and_submit.value = 'true';\n            assessment.resetFields();\n            assessment.submitAttemptForm();\n            document.forms.saveAttemptForm.save_and_submit.value = '';\n        ");
        console.log("hello");
    })
        .wait(config_1.Config.SHOW_ANSWER)
        .click(config_1.Config.SHOW_ANSWER)
        .wait(".vtbegenerated")
        .evaluate(function () {
        //问题主题
        var questionBodys = document.querySelectorAll(".details table tbody");
        //问题集合
        var questionArr = [];
        for (var i = 0; i < questionBodys.length; i += 2) {
            var answerArr = [];
            var answer = void 0;
            var title = questionBodys.item(i).querySelector(".vtbegenerated.inlineVtbegenerated").innerText;
            //正确答案
            var tmp = questionBodys.item(i + 1).querySelectorAll("tr");
            for (var j = 0; j < tmp.length; j++) {
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
        .then(function (questionArr) { return __awaiter(_this, void 0, void 0, function () {
        var _i, questionArr_1, v, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(questionArr.length);
                    _i = 0, questionArr_1 = questionArr;
                    _a.label = 1;
                case 1:
                    if (!(_i < questionArr_1.length)) return [3 /*break*/, 6];
                    v = questionArr_1[_i];
                    return [4 /*yield*/, getQuestion_1.getQuestion({ title: v.title })];
                case 2:
                    data = _a.sent();
                    if (!(data.length == 0)) return [3 /*break*/, 4];
                    console.log("collection");
                    return [4 /*yield*/, insertQuestion_1.insertQuestion(v.title, v.answer)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    console.log("repeat");
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    }); })
        .catch(function (err) { return console.log(err); });
}
else {
    //自动填写
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getQuestion_1.getQuestion({})];
                case 1:
                    doc = _a.sent();
                    login_1.loginNightmare(sid, testID, teacher)
                        .wait("legend")
                        .evaluate(function (doc) {
                        var questionId = 1;
                        var questionContent = "stepcontent";
                        var trim = function (s) {
                            return s.replace(/\\s*|\t|\r|\n/g, "");
                        };
                        var _loop_1 = function () {
                            var ele = document.querySelector("#" + questionContent + questionId);
                            if (!ele)
                                return "break";
                            //题目
                            var t = ele.querySelector("legend").innerText;
                            //判断题
                            var judgeAnswer = ele.parentElement.querySelectorAll("p");
                            //多选题 单选题
                            var checkBoxRadioAnswer = ele.parentElement.querySelectorAll("tbody tr");
                            //查看是否存在此题目的答案
                            var tArr = doc.filter(function (v) { return new RegExp(trim(t), 'g').test(trim(v.title)); });
                            if (tArr.length != 0) {
                                // if(new RegExp("展过程中，要更加自觉").test(t)) console.log(tArr)
                                for (var _i = 0, _a = tArr[0].answer; _i < _a.length; _i++) {
                                    var val = _a[_i];
                                    //判断题
                                    for (var i = 0; i < judgeAnswer.length - 1; i++) {
                                        if (!judgeAnswer.item(i))
                                            break;
                                        if (new RegExp(trim(judgeAnswer.item(i).innerText), "g").test(val)) {
                                            // console.log("判断题点击");
                                            var obj = judgeAnswer.item(i).querySelector("label");
                                            if (obj)
                                                obj.click();
                                        }
                                    }
                                    //多选单选题
                                    for (var i = 0; i < checkBoxRadioAnswer.length; i++) {
                                        if (!checkBoxRadioAnswer.item(i))
                                            break;
                                        var text = checkBoxRadioAnswer.item(i).innerText;
                                        if (new RegExp(trim(text), "g").test(val)) {
                                            checkBoxRadioAnswer.item(i).querySelector("label").click();
                                        }
                                    }
                                }
                            }
                            questionId++;
                        };
                        while (true) {
                            var state_1 = _loop_1();
                            if (state_1 === "break")
                                break;
                        }
                    }, doc)
                        .evaluate(function () {
                        //提交测验
                        eval("\n                document.forms.saveAttemptForm.save_and_submit.value = 'true';\n                assessment.resetFields();\n                assessment.submitAttemptForm();\n                document.forms.saveAttemptForm.save_and_submit.value = '';\n            ");
                        console.log("hello");
                    })
                        .wait(config_1.Config.SHOW_ANSWER)
                        .click(config_1.Config.SHOW_ANSWER)
                        .wait(".infoListWrapper")
                        .evaluate(function () {
                        var result = document.querySelector(".infoListWrapper").querySelector("tr:nth-child(7) td").innerText.split(" ")[1];
                        return result;
                    })
                        .then(function (result) {
                        console.log(result);
                        process.exit();
                    })
                        .catch(function (err) {
                        console.log(err);
                        process.exit();
                    });
                    return [2 /*return*/];
            }
        });
    }); })();
}
