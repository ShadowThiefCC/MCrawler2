import * as program from "commander";

program
  .version("1.0.0")
  .option("-s, --studentID [value]", "Add student ID")
  .option("-t, --type [value]", "Type of operate")
  .option("-c, --testID [value]", "Add test ID")
  .option("-l, --teacher [value]", "The teacher that teaches you")
  .parse(process.argv);

export { program };
