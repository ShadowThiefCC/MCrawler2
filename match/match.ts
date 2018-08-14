import { Config } from "../config/config";

export let match = function(testID:string){
    switch(testID){
        case "test7":
        return Config.TEST_7
        case "test8":
        return Config.TEST_8
        case "test9":
        return Config.TEST_9
        case "test10":
        return Config.TEST_10
        case "test11_12":
        return Config.TEST_11_12
        case "test8_select":
        return Config.TEST_8_SELECT
    }
}