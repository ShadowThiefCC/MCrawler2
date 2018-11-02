import * as program from "commander";

program
  .version("1.0.0")
  .option("-s, --studentID [value]", "add student ID")
  .option("-t, --type [value]", "type of operate")
  .option("-c, --testID [value]", "add test ID")
  .option("-l, --teacher [value]", "the teacher that teaches you")
  .parse(process.argv);

export { program };
