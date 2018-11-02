import { program } from "../commander";

export let isEmpty = function(flag: string) {
  if (!flag) {
    program.outputHelp();
    process.exit();
  }
};
