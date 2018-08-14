/**
 * 配置文件 记录各种常量
 */
export class Config{
    //临时学号
    public static readonly TMP_SID = "201512093845"

    //题目访问接口
    public static readonly TEST_7 = "#_100049_1 a" //第七章
    public static readonly TEST_8 = "#_100072_1 a" //第八章
    public static readonly TEST_9 = "#_100076_1 a" //第九章
    public static readonly TEST_10 = "#_100073_1 a" //第十章
    public static readonly TEST_11_12 = "#_100074_1 a" //十一 十二章
    public static readonly TEST_8_SELECT = "#_100075_1 a" //第八章多选题

    //题目访问接口集合
    public static readonly TEST_ARR = [Config.TEST_7, Config.TEST_8, Config.TEST_9, Config.TEST_10, Config.TEST_11_12]
    
    //登陆的URL
    public static readonly LOGIN_URL = "https://course.scetc.edu.cn/webapps/login/"

    //学号
    public static readonly SID_LENTH = 12
    public static readonly PASSWORD_LENTH = 6

    //学号密码输入框
    public static readonly INPUT_USER_ID = "#user_id"
    public static readonly INPUT_PASSWORD_ID = "#password"
    //登陆按钮
    public static readonly INPUT_LOGIN_ID = "#entry-login"

    //课程入口
    // public static readonly TEST_ENTRY_ID_1 = "#_4_1termCourses_noterm ul li:nth-child(1) a"
    public static readonly TEST_ENTRY_ID_1 = "#_4_1termCourses_noterm ul"
    public static readonly TEST_ENTRY_ID_2 = "#courseMenuPalette_contents li:nth-child(11) a"

    //进入做题按钮
    public static readonly DO_TEST_ENTRY_BUTTON = "#bottom_submitButtonRow input:nth-child(2)" 
    public static readonly DO_TEST_ENTRY_BUTTON_2 = ".attemptNavigation a:nth-child(3)" 
    
    //查看答案按钮
    public static readonly SHOW_ANSWER = ".backLink a"
}
