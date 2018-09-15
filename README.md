# MCrawler2

## 描述
毛概爬虫第二版，仅限于 `bb` 平台

## 动机
第一版爬虫用 Angular 构建，当时只有查看答案的功能，但是题目还是得自己做，考虑到题量巨大，会消磨掉许多时间。
<br />于是重写第二版爬虫，试图创建一个通用的命令行工具，与 APP 无关，让无论是 `webapp` 还是 `native app` 都能直接调用。
<br />并且增加了自动做题的功能:rocket::rocket::rocket:

## CLI

```
node index [sid] [opera] [testID]
```

<br />sid为学号
<br />opera为操作标志，可为`collection`收集答案和`doTest`做题
<br />testID为做的章节，比如第七章`test7`

多个章节，比如11和12章一起，`test11_12`

