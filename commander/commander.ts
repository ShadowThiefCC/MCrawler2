import * as program from "commander";

program
  .version("1.0.0")
  .option("-s, --studentID", "Add student ID")
  .option("-t, --type", "Type of operate")
  .option("-c, --testID", "Add test ID")
  .option("-t, --teacher", "The teacher that teaches you")
  .parse(process.argv);

export { program };
