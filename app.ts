import { nightmare } from "./nmFactory/nmFactory";
import { Config } from "./config/config";
import { parseSid } from "./parseSid/parseSid";
import { trim } from "./trim/trim";
import { insertQuestion } from "./insertQuestion/insertQuestion";
import { getQuestion } from "./getQuestion/getQuestion";
import { loginNightmare } from "./login/login";
import { isEmpty } from "./argv/argv";

//第一个参数为学号
const sid = process.argv[2];
//决定实现什么操作
const opera = process.argv[3];
//测试号
const testID = process.argv[4];
//教学老师
const teacher = process.argv[5];

isEmpty(sid);
isEmpty(opera);
isEmpty(testID);
isEmpty(teacher);

if (opera == "collection") {
  loginNightmare(sid, testID, teacher)
    .wait("#bottom_submitButtonRow")
    //直接提交
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
    .wait(Config.SHOW_ANSWER)
    .click(Config.SHOW_ANSWER)
    //爬取答案存入数据库
    .wait(".vtbegenerated")
    .evaluate(() => {
      //问题主题

      let questionBodys = document.querySelectorAll(".details table tbody");

      //问题集合
      let questionArr: Array<{ title: string; answer: any }> = [];

      for (let i = 0; i < questionBodys.length; i += 2) {
        let answerArr = [];
        let answer;
        let title = (questionBodys
          .item(i)
          .querySelector(".vtbegenerated.inlineVtbegenerated") as any)
          .innerText;
        //正确答案
        let tmp = questionBodys.item(i + 1).querySelectorAll("tr");
        for (let j = 0; j < tmp.length; j++) {
          if (tmp.item(j).querySelector(".correctAnswerFlag")) {
            if (j == 1) {
              answer = (tmp
                .item(j)
                .querySelector(".reviewQuestionsAnswerDiv") as any).innerText;
            } else {
              answer = tmp.item(j).innerText;
            }
            answerArr.push(answer);
          }
        }

        questionArr.push({ title: title, answer: answerArr });
      }

      return questionArr;
    })
    .then(async (questionArr: any) => {
      console.log(questionArr.length);
      for (let v of questionArr) {
        let data = await getQuestion({ title: v.title });
        if (data.length == 0) {
          console.log("collection");
          await insertQuestion(v.title, v.answer);
        } else {
          console.log("repeat");
        }
      }
    })
    .catch((err: Error) => console.log(err));
} else {
  //自动填写
  (async () => {
    let doc = await getQuestion({});
    loginNightmare(sid, testID, teacher)
      .wait("legend")
      .evaluate<Document[]>(
        (doc: Document[]) => {
          let questionId = 1;
          let questionContent = "stepcontent";

          let trim = function(s: string): string {
            return s.replace(/\\s*|\t|\r|\n/g, "");
          };

          while (true) {
            let ele = document.querySelector(
              `#${questionContent}${questionId}`
            );
            if (!ele) break;
            //题目
            let t = (ele.querySelector("legend") as any).innerText;

            //判断题
            let judgeAnswer = ele.parentElement.querySelectorAll("p");
            //多选题 单选题
            let checkBoxRadioAnswer = ele.parentElement.querySelectorAll(
              "tbody tr"
            );

            //查看是否存在此题目的答案
            let tArr = doc.filter(v =>
              new RegExp(trim(t), "g").test(trim(v.title))
            );
            if (tArr.length != 0) {
              // if(new RegExp("展过程中，要更加自觉").test(t)) console.log(tArr)
              for (let val of (tArr[0] as any).answer) {
                //判断题
                for (let i = 0; i < judgeAnswer.length - 1; i++) {
                  if (!judgeAnswer.item(i)) break;
                  if (
                    new RegExp(trim(judgeAnswer.item(i).innerText), "g").test(
                      val
                    )
                  ) {
                    // console.log("判断题点击");
                    let obj = judgeAnswer.item(i).querySelector("label") as any;
                    if (obj) obj.click();
                  }
                }

                //多选单选题
                for (let i = 0; i < checkBoxRadioAnswer.length; i++) {
                  if (!checkBoxRadioAnswer.item(i)) break;
                  let text: string = (checkBoxRadioAnswer.item(i) as any)
                    .innerText;
                  if (new RegExp(trim(text), "g").test(val)) {
                    (checkBoxRadioAnswer
                      .item(i)
                      .querySelector("label") as any).click();
                  }
                }
              }
            }
            questionId++;
          }
        },
        null,
        doc
      )
      //直接提交
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
      .wait(Config.SHOW_ANSWER)
      .click(Config.SHOW_ANSWER)
      .wait(".infoListWrapper")
      .evaluate(() => {
        let result: string = (document
          .querySelector(".infoListWrapper")
          .querySelector("tr:nth-child(7) td") as any).innerText.split(" ")[1];
        return result;
      })
      .then((result: string) => {
        console.log(result);
        process.exit();
      })
      .catch((err: Error) => {
        console.log(err);
        process.exit();
      });
  })();
}
