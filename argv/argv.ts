export let isEmpty = function(flag:string){
    if(!flag) {
        console.log("usage: 学号 操作符 练习题号")
        process.exit()
    }
}