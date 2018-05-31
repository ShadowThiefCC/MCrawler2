export let trim = function(s:string):string{
    return s.replace(/(^\s*)|(\s*$)/g, "");
}